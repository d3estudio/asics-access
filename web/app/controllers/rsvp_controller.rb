class RsvpController < ApplicationController
  protect_from_forgery


  def get_guest_by_token
    token =  params[:token] or return missing_field(:token)

    guest = Guest.find_by(invite_token: token)

    return reject_request(error: 'GuestNotFound',
                          message: 'The requested guest invite could not be found',
                          action: ['Stop']) unless guest

    render json: { succeeded: true, result: guest }
  end



  def confirm_invite
    invite_token = params[:invite_token] or return missing_field(:invite_token)
    name = params[:name] or return missing_field(:name)
    email = params[:email] or return missing_field(:email)

    guest = Guest.find_by(email:email, invite_token: invite_token)

    return reject_request(error: 'GuestNotFound',
                          message: 'The requested guest invite could not be found',
                          action: ['Stop']) unless guest

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
end
