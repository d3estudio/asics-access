class AdminController < ApplicationController
  protect_from_forgery


  def invite_guest
    name = params[:name]
    email = params[:email]
    occupation = params[:occupation]
    language = params[:language]

    require_fields([ name, email, occupation, language ])

    guest = Guest.new

    guest.name = name
    guest.email = email
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
end
