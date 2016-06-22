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

  def log_logs
    logs = params[:logs]

    return reject_request(error: 'MissingField',
                          message: 'Missing logs field',
                          action: ['Retry']) unless logs




    logs.each do |log|
      guest = Guest.find(log['guest_id'])
      guest.logs.create(action: 1, created_at: log['created_at'])
    end

    render json: Log.all
  end

  private
    def get_guests
      return Guest
                 .select("id, name, email, qr_code, occupation, updated_at")
                 .where(rsvp: true)
                 .order(:updated_at)
    end

    def logs_params
      params.require(:logs).permit(:guest_id, :created_at, :action)
    end
end
