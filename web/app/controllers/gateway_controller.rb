class GatewayController < ApplicationController
  protect_from_forgery

  def get_all_guests
    guests = get_guests()

    render json: guests
  end

  def get_guests_updated_since
    updated_since = params[:updated_since]

    return reject_request(error: 'MissingField',
                          message: 'Missing updated_since field',
                          action: ['Retry']) unless updated_since


    guests = get_guests.updated_after(updated_since)

    render json: guests
  end

  private
    def get_guests
      return Guest
                 .select("id, name, email, qr_code, updated_at")
                 .where(rsvp: true)
                 .order(:updated_at)
    end
end
