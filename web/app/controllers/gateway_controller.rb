class GatewayController < ApplicationController
  protect_from_forgery

  def get_all_guests
    guests = get_guests()

    render json: guests
  end

  def get_guests_updated_since
    updated_since = require_field( :updated_since )

    guests = get_guests.updated_after(updated_since)

    render json: guests
  end

  def log_logs
    logs = require_field( :logs )

    logs.each do |log|
      guest = Guest.unscope(where: :removed_at).find(log['guest_id'])
      guest.logs.create(action: 1, created_at: log['created_at'])
    end

    render json: Log.all
  end

  private
    def get_guests
      Guest
           .select("id, name, email, qr_code, occupation, updated_at, removed_at")
           .unscope(where: :removed_at)
           .where(rsvp: true)
           .order(:updated_at)
    end
end
