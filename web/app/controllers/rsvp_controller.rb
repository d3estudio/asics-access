class RsvpController < ApplicationController
  protect_from_forgery :except => :create

  def new
    @guest = Guest.new
    # Automagically renders new.html.erb
  end

  def create
    @guest = Guest.create(guest_create_fields)

    respond_to do |format|
      format.html # create.html.erb
      format.json { render json: guest }
    end
  end

  private
    def guest_create_fields
      params.require(:guest).permit(:name, :email)
    end
end
