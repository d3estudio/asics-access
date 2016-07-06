class RsvpController < ApplicationController
  protect_from_forgery


  def get_guest_by_token
    token =  params[:token] or return missing_field(:token)

    guest = Guest.not_removed.find_by(invite_token: token)

    return reject_request(error: 'GuestNotFound',
                          message: 'The requested guest invite could not be found',
                          action: ['Stop']) unless guest

    render json: { succeeded: true, result: guest }
  end



  def confirm_invite
    invite_token = params[:invite_token] or return missing_field(:invite_token)

    guest = Guest.not_removed.find_by(invite_token: invite_token)

    return reject_request(error: 'GuestNotFound',
                          message: 'The requested guest invite could not be found',
                          action: ['Stop']) unless guest

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
end
