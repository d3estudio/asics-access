class RsvpController < ApplicationController
  protect_from_forgery


  def confirm_invite
    token = params[:invite_token]
    name = params[:name]
    email = params[:email]

    return reject_request(error: 'MissingField',
                          message: 'Missing token field',
                          action: ['Retry']) unless token
    return reject_request(error: 'MissingField',
                          message: 'Missing name field',
                          action: ['Retry']) unless name
    return reject_request(error: 'MissingField',
                          message: 'Missing email field',
                          action: ['Retry']) unless email

    guest = Guest.find_by(email:email, invite_token: token)
    return reject_request(error: 'GuestNotFound',
                          message: 'The requested guest invite could not be found',
                          action: ['Stop']) unless guest


    return reject_request(error: 'ValidationFailed',
                          message: 'The requested guest invite is already confirmed',
                          action: ['Retry']) if guest.rsvp

    guest.name = name
    guest.email = email

    guest.rsvp = true
    guest.qr_code = Digest::SHA1.hexdigest([Time.now, rand].join)

    if g.save
      render json: { succeeded: true, result: g.to_json }
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
