require 'csv'

class AdminController < ApplicationController
  protect_from_forgery

  # GUESTS
  def invite_guest
    (name = params[:name]) || (return missing_field(:name))
    (email = params[:email].downcase) || (return missing_field(:email))
    (occupation = params[:occupation]) || (return missing_field(:occupation))
    (language = params[:language]) || (return missing_field(:language))
    (country = params[:country]) || (return missing_field(:country))

    response = invite_guest_and_send_email(name, email, occupation, language, country)

    if response[:succeeded] == true
      return render json: response
    else
      return reject_request(response)
    end
  end

  def send_spreadsheet
    (email = params[:email]) || (return missing_field(:email))
    (file = params[:file]) || (return missing_field(:file))

    AdminMailer.invite_csv_file_email(email, file).deliver_now

    render json: { succeeded: true }
  end

  def invite_guests_csv
    (csv = params[:csv]) || (return missing_field(:csv))

    result = {
      errors: [],
      success: [],
      alreadyInvited: []
    }
    line = 1;

    CSV.foreach(csv.path, headers: true) do |row|
      newGuest = row.to_hash

      response = invite_guest_and_send_email(
        newGuest["name"],
        newGuest["email"],
        newGuest["occupation"],
        newGuest["language"],
        newGuest["country"]
      )

      if response[:succeeded] == true
        result[:success] << newGuest
      elsif response[:error] == 'GuestAlreadyInvited'
        result[:alreadyInvited] << newGuest
      else
        result[:errors] << { csv_line: line, guest: newGuest, error: response[:message] }
      end

      line += 1;
    end

    render json: { result: result }
  end

  def get_guests_information
    guests = Guest.not_removed.order(created_at: :desc).limit(50)
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

    filename = 'Asics Hub guest list ' + (!str.blank? ? "(#{str}) " : '') + "(#{Date.today}).csv"

    csv = guests.to_csv

    send_data(
      csv,
      type: 'text/csv',
      disposition: 'attachment',
      filename: filename
    )
  end

  def search_guests_information
    (str = params[:search_string]) || (return missing_field(:search_string))

    guests = search_guests(str).order(created_at: :desc)

    result = {
      guests: guests
    }

    render json: { succeeded: true, result: result }
  end

  def resend_email_to_guest
    (guest_id = params[:guest_id]) || (return missing_field(:guest_id))

    guest = Guest.not_removed.where(id: guest_id).first
    return reject_request(error: 'GuestNotFound',
                          message: 'Guest not found',
                          action: ['Stop']) unless guest

    if !guest.rsvp
      CommonMailer.invite_email(guest).deliver_later
      message = 'Invitation sent to ' + guest.name
    else
      guest.generate_qr_code

      return reject_request(error: 'ValidationFailed',
                            message: guest.errors,
                            action: ['Retry']) unless guest.save

      CommonMailer.confirm_email(guest).deliver_later
      message = 'New access code sent to ' + guest.name
    end

    render json: { succeeded: true, result: { guest: guest, message: message } }
  end

  def delete_guest
    (guest_id = params[:guest_id]) || (return missing_field(:guest_id))

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
             .where('logs.created_at > ?', DateTime.now.beginning_of_day)
    logs = get_logs_of_guests(guests).from_today
    render json: { succeeded: true, result: { logs: logs } }
  end

  def search_logs_information
    (str = params[:search_string]) || (return missing_field(:search_string))

    guests = get_guests_with_count
    logs = get_logs_of_guests(guests)
           .where('guests.name ILIKE ? OR guests.email ILIKE ?', "%#{str}%", "%#{str}%")

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

    count
  end

  def get_guests_with_count
    guests = Guest
             .select('guests.id, name, email, occupation, count(logs.id) as logs_count')
             .joins(:logs)
             .group('guests.id')

    guests
  end

  def get_logs_of_guests(guests)
    guests = guests.to_sql

    logs = Log
           .select('logs.id, logs.created_at, guests.name, guests.email, guests.occupation, guests.logs_count')
           .joins("JOIN (#{guests}) guests ON logs.guest_id = guests.id")
           .order('logs.created_at DESC')

    logs
  end

  def search_guests(str)
      guests = Guest.not_removed
                  .where("unaccent(name) ILIKE unaccent(:s) OR email ILIKE unaccent(:s) OR occupation ILIKE unaccent(:s)", {s: "%#{str}%"})

    guests
  end

  def invite_guest_and_send_email(name, email, occupation, language, country)
    return missing_field_response('name') unless name
    return missing_field_response('email') unless email
    return missing_field_response('occupation') unless occupation
    return missing_field_response('language') unless language
    return missing_field_response('country') unless country

    email = email.downcase

    guest = Guest.where(email: email).first

    if guest
      return {  error: 'GuestAlreadyInvited',
                message: 'Email already invited',
                action: ['Stop'] } unless guest.removed_at
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
      return { succeeded: true, result: guest }
    else
      return {   error: 'ValidationFailed',
                 message: guest.errors,
                 action: ['Retry'] }
    end
  end
end
