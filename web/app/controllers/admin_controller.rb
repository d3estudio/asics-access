class AdminController < ApplicationController
  protect_from_forgery



  def invite_guest
    name = require_field(:name)
    email = require_field(:email)
    occupation = require_field(:occupation)
    language = require_field(:language)

    guest = Guest.where(email: email).unscope(where: :removed_at).first;

    if guest
      return reject_request(error: 'GuestNotFound',
                            message: 'The requested email is already invited',
                            action: ['Retry']) unless guest.removed_at != nil
    else
      guest = Guest.new
      guest.email = email
    end

    guest.name = name
    guest.removed_at = nil
    guest.occupation = occupation
    guest.language = language

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
    guests = Guest.all
    guests_confirmed = guests.where(rsvp: true)

    count_athletes_confirmed = guests_confirmed.where(occupation: 'athlete').count
    count_guests_confirmed = guests_confirmed.where.not(occupation: 'athlete').count

    result = {
      confirmed_guests: count_guests_confirmed,
      confirmed_athletes: count_athletes_confirmed,
      guests: guests
    }

    render json: { succeeded: true, result: result }
  end



  def resend_email_to_guest
    guest_id = require_field(:guest_id)

    guest = Guest.where(id: guest_id).first
    return reject_request(error: 'GuestNotFound',
                          message: 'The requested guest could not be found',
                          action: ['Stop']) unless guest

    if !guest.rsvp
      CommonMailer.invite_email(guest).deliver_later
      message = "Email de confirmação reenviado para " + guest.name
    else
      guest.qr_code = Digest::SHA1.hexdigest([Time.now, rand].join)

      return reject_request(error: 'ValidationFailed',
                            message: guest.errors,
                            action: ['Retry']) unless guest.save

      CommonMailer.confirm_email(guest).deliver_later
      message = "Email com QRCode reenviado para " + guest.name
    end

    render json: { succeeded: true, result: { guest: guest, message: message} }
  end



  def delete_guest
    guest_id = require_field(:guest_id)

    require_fields([ guest_id ])

    guest = Guest.find_by(id: guest_id)

    return reject_request(error: 'GuestNotFound',
                          message: 'The requested guest could not be found',
                          action: ['Stop']) unless guest

    guest.removed_at = Time.now
    guest.qr_code = nil
    guest.invite_token = nil
    guest.rsvp = false

    if guest.save
      render json: { succeeded: true, result: { guest: guest } }
    else
      reject_request(error: 'ValidationFailed',
                     message: guest.errors,
                     action: ['Retry'])
    end
  end
end
