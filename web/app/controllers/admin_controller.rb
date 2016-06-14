class AdminController < ApplicationController
  protect_from_forgery


  def invite_guest
    name = params[:name]
    email = params[:email]

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

  private
    def guest_create_fields
      params.require(:guest).permit(:name, :email, :vegetarian, :alcohol)
    end
end
