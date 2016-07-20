class AdminController < ApplicationController
  protect_from_forgery

  # GUESTS
  def invite_guest
    name = params[:name] or return missing_field(:name)
    email = params[:email].downcase or return missing_field(:email)
    occupation = params[:occupation] or return missing_field(:occupation)
    language = params[:language] or return missing_field(:language)
    country = params[:country] or return missing_field(:country)

    guest = Guest.where(email: email).first;

    if guest
      return reject_request(error: 'GuestAlreadyExists',
                            message: 'Email already invited',
                            action: ['Retry']) unless guest.removed_at
    else
      guest = Guest.new
      guest.email = email
    end

    guest.name = name
    guest.removed_at = nil
    guest.occupation = occupation
    guest.language = language
    guest.country = country

    if guest.save
      CommonMailer.invite_email(guest).deliver_later
      render json: { succeeded: true, result: guest }
    else
      reject_request(error: 'ValidationFailed',
                     message: guest.errors,
                     action: ['Retry'])
    end
  end



  def get_guests_information
    guests = Guest.not_removed.order(created_at: :desc)
    count = get_count_of_guests(guests)

    result = {
        count: count,
        guests: guests
    }

    render json: { succeeded: true, result: result }
  end

    def get_guests_csv
        str = params[:search_string]

        guests = search_guests(str).order(country: :asc)

        if str
            filename = "Asics Hub guest list (#{str}) (#{Date.today}).csv"
        else
            filename = "Asics Hub guest list (#{Date.today}).csv"
        end

        csv = guests.to_csv

        send_data(
            csv,
            type: 'text/csv',
            disposition: 'attachment',
            filename: filename
        )
    end

    def search_guests_information
        str = params[:search_string] or return missing_field(:search_string)

        guests = search_guests(str).order(created_at: :desc)

        result = {
            guests: guests
        }

        render json: { succeeded: true, result: result }
    end



  def resend_email_to_guest
    guest_id = params[:guest_id] or return missing_field(:guest_id)

    guest = Guest.not_removed.where(id: guest_id).first
    return reject_request(error: 'GuestNotFound',
                          message: 'Guest not found',
                          action: ['Stop']) unless guest

    if !guest.rsvp
      CommonMailer.invite_email(guest).deliver_later
      message = "Invitation sent to " + guest.name
    else
      guest.generate_qr_code

      return reject_request(error: 'ValidationFailed',
                            message: guest.errors,
                            action: ['Retry']) unless guest.save

      CommonMailer.confirm_email(guest).deliver_later
      message = "New access code sent to " + guest.name
    end

    render json: { succeeded: true, result: { guest: guest, message: message} }
  end



  def delete_guest
    guest_id = params[:guest_id] or return missing_field(:guest_id)

    guest = Guest.not_removed.find_by(id: guest_id)

    return reject_request(error: 'GuestNotFound',
                          message: 'Guest not found',
                          action: ['Stop']) unless guest

    guest.removed_at = Time.now
    guest.qr_code = nil
    guest.invite_token = nil
    guest.music = nil
    guest.rsvp = false

    if guest.save
        render json: { succeeded: true, result: { guest: guest, succeeded: true } }
    else
        reject_request(error: 'ValidationFailed',
                       message: guest.errors,
                       action: ['Retry'])
    end
  end

    def get_logs_information
        guests = get_guests_with_count
            .where("logs.created_at > ?", DateTime.now.beginning_of_day)
        logs = get_logs_of_guests(guests).from_today
        render json: { succeeded: true, result: { logs: logs } }
    end

    def search_logs_information
        str = params[:search_string] or return missing_field(:search_string)

        guests = get_guests_with_count
        logs = get_logs_of_guests(guests)
            .where("guests.name ILIKE ? OR guests.email ILIKE ?", "%#{str}%", "%#{str}%")

        render json: { succeeded: true, result: { logs: logs } }
    end


    private

    def get_count_of_guests(guests)
        athletes = guests.where('occupation=? OR occupation=?', 'Atleta Asics', 'Asics Athlete')
        normal = guests.where.not('occupation=? OR occupation=?', 'Atleta Asics', 'Asics Athlete')

        athletes_total = athletes.size
        normal_total = normal.size

        athletes_confirmed = athletes.where(rsvp: true).size
        normal_confirmed = normal.where(rsvp: true).size

        all_total = athletes_total + normal_total
        all_confirmed = athletes_confirmed + normal_confirmed

        count = {
            athletes: {
                total: athletes_total,
                confirmed: athletes_confirmed,
                remaining: athletes_total - athletes_confirmed
            },
            normal: {
                total: normal_total,
                confirmed: normal_confirmed,
                remaining: normal_total - normal_confirmed
            },
            all: {
                total: all_total,
                confirmed: all_confirmed,
                remaining: all_total - all_confirmed
            }
        }

        return count
    end

    def get_guests_with_count
        guests = Guest
            .select('guests.id, name, email, occupation, count(logs.id) as logs_count')
            .joins(:logs)
            .group("guests.id")

        return guests
    end

    def get_logs_of_guests(guests)
        guests = guests.to_sql

        logs = Log
            .select('logs.id, logs.created_at, guests.name, guests.email, guests.occupation, guests.logs_count')
            .joins("JOIN (#{guests}) guests ON logs.guest_id = guests.id")
            .order("logs.created_at DESC")

        return logs
    end

    def search_guests(str)
        guests = Guest.not_removed
                    .where("name ILIKE :s OR email ILIKE :s OR occupation ILIKE :s", {s: "%#{str}%"})

        return guests
    end

end
