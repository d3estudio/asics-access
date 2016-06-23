class AdminController < ApplicationController
  protect_from_forgery


  def invite_guest
    require_fields('hi')
    name = params[:name]
    email = params[:email]
    occupation = params[:occupation]
    language = params[:language]

    return reject_request(error: 'MissingField',
                          message: 'Missing name field',
                          action: ['Retry']) unless name
    return reject_request(error: 'MissingField',
                          message: 'Missing email field',
                          action: ['Retry']) unless email

    guest = Guest.new

    guest.name = name
    guest.email = email

    if guest.save
      CommonMailer.invite_email(guest).deliver_later

      render json: { succeeded: true, result: guest }
    else
      reject_request(error: 'ValidationFailed',
                     message: guest.errors,
                     action: ['Retry'])
    end
  end

  def get_guests
    guests = Guest.all

    render json: { succeeded: true, result: { guests: guests } }
  end
end
