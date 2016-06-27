class GatewayController < ApplicationController
  protect_from_forgery
  before_action :require_valid_token



  def get_all_guests
    guests = get_guests

    render json: guests
  end

  def get_guests_updated_since
    updated_since = params[:updated_since] or return missing_field(:updated_since)

    guests = get_guests.updated_after(updated_since)

    render json: guests
  end



  def post_logs
    logs = params[:logs] or return missing_field(:logs)

    missing_fields = []

    logs.each do |log|
      guest = Guest.unscope(where: :removed_at).find(log[:guest_id])
      id = log[:id]
      created_at = log[:created_at]

      if guest && id && created_at
        guest.logs.create(id: id, created_at: created_at, access_token: @access_token)
      else
        missing_fields << log
      end
    end

    if missing_fields.size > 0
      answer = {
        message: 'Some logs have missing or invalid fields and where not saved',
        missing_fields: missing_fields
      }

      render json: answer
    else
      render json: { succeeded: true }
    end
  end

  def get_all_logs
    logs = Log.all.order(:created_at)

    render json: logs
  end

  def get_logs_created_since
    created_since = params[:created_since] or return missing_field(:created_since)

    logs = Log.created_after(created_since).order(:created_at)

    render json: logs
  end

  def get_other_logs_created_since
    created_since = params[:created_since] or return missing_field(:created_since)

    logs = Log.created_after(created_since).not_created_by(@access_token).order(:created_at)

    render json: logs
  end



  private
    def get_guests
      Guest
           .select("id, name, email, qr_code, occupation, updated_at, removed_at")
           .unscope(where: :removed_at)
           .where(rsvp: true)
           .order(:updated_at)
    end

    def require_valid_token
      @access_token =  params[:access_token] or return missing_field(:access_token)

      valid_tokens = YAML::load(File.open("#{Rails.root}/config/valid_tokens.yml"))

      reject_request( error: 'Forbidden',
                      message: 'Access forbidden',
                      action: ['Stop']) unless valid_tokens.include? @access_token
    end
end
