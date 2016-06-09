module ApplicationHelper
  def reject_request(params = {})
    render  status: :bad_request,
            json:   {
              error: params[:error],
              message: params[:message],
              action: params[:action]
            }
  end
end
