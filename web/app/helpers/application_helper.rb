module ApplicationHelper
  def reject_request(params = {})
    render  status: :bad_request,
            json:   {
              error: params[:error],
              message: params[:message],
              action: params[:action]
            }
  end

  def missing_field(field = '')
    reject_request( error: 'MissingField',
                    message: 'Missing ' + field.to_s + ' field',
                    action: ['Retry'])
  end
end
