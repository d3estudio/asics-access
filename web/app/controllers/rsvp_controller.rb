class RsvpController < ApplicationController
    protect_from_forgery

    def get_guest_by_token
        token =  params[:token] or return missing_field(:token)

        guest = Guest.not_removed.find_by(invite_token: token)

        return reject_request(error: 'GuestNotFound',
                              message: 'Convidado inexistente',
                              action: ['Stop']) unless guest

        render json: { succeeded: true, result: guest }
    end

    def confirm_invite
        invite_token = params[:invite_token] or return missing_field(:invite_token)

        guest = Guest.not_removed.find_by(invite_token: invite_token)

        return reject_request(error: 'GuestNotFound',
                              message: 'Convidado inexistente',
                              action: ['Stop']) unless guest

        return reject_request(error: 'GuestAlreadyConfirmed',
                              message: 'Convidado já confirmado',
                              action: ['Stop']) if guest.rsvp

        if guest.occupation == 'Atleta Asics'
            music = params[:music] or return missing_field(:music)
            guest.music = music
        end

        guest.rsvp = true
        guest.generate_qr_code

        if guest.save
            CommonMailer.confirm_email(guest).deliver_later

            render json: { succeeded: true, result: guest }
        else
            reject_request(error: 'ValidationFailed',
                            message: guest.errors,
                            action: ['Retry'])
        end
    end

    def generate_passbook_from_qrcode
        qr_code = params[:qr_code] or return missing_field(:qr_code)

        guest = Guest.not_removed.find_by(qr_code: qr_code)

        return reject_request(error: 'GuestNotFound',
                              message: 'Convidado inexistente',
                              action: ['Stop']) unless guest

        package_path = Rails.root.join("config", "passbook", "package")

        json_content = File.read(File.join(package_path, "pass.json"))
        json_content.gsub! '#QRCODE#', guest.qr_code

        pass = Passbook::PKPass.new json_content

        Dir.foreach(package_path) do |item|
            next if item == '.' or item == '..' or item == 'pass.json'
            pass.addFile File.join(package_path, item)
        end

        pkpass = pass.file

        send_file(
            pkpass.path,
            type: 'application/vnd.apple.pkpass',
            disposition: 'attachment',
            filename: "pass.pkpass"
        )
    end
end
