class RsvpController < ApplicationController
  protect_from_forgery


  def get_guest_by_token
    token = params[:token]

    return reject_request(error: 'MissingField',
                          message: 'Missing token field',
                          action: ['Retry']) unless token

    guest = Guest.find_by(invite_token: token)

    return reject_request(error: 'GuestNotFound',
                          message: 'The requested guest invite could not be found',
                          action: ['Stop']) unless guest

    render json: { succeeded: true, result: guest }
  end



  def confirm_invite
    token = require_field(:invite_token)
    name = require_field(:name)
    email = require_field(:email)

    guest = Guest.find_by(email:email, invite_token: token)

    return reject_request(error: 'GuestNotFound',
                          message: 'The requested guest invite could not be found',
                          action: ['Stop']) unless guest

    # return reject_request(error: 'ValidationFailed',
    #                       message: 'Convite já confirmado',
    #                       action: ['Retry']) if guest.rsvp

    guest.name = name
    guest.email = email

    guest.rsvp = true
    guest.qr_code = Digest::SHA1.hexdigest([Time.now, rand].join)

    if guest.save
      CommonMailer.confirm_email(guest).deliver_later

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
