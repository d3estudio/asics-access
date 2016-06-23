module ApplicationHelper
  def reject_request(params = {})
    render  status: :bad_request,
            json:   {
              error: params[:error],
              message: params[:message],
              action: params[:action]
            }
  end


  def require_fields(fields = [])
    fields.each do |field|
      return reject_request(error: 'MissingField',
                            message: 'Missing ' + field + ' field',
                            action: ['Retry']) unless field
    end
  end
end
