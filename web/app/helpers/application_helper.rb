module ApplicationHelper
  def reject_request(params = {})
    render  status: :bad_request,
            json:   {
              error: params[:error],
              message: params[:message],
              action: params[:action]
            }
  end


  def require_field(field = '')
    value = params[field]

    reject_request( error: 'MissingField',
                    message: 'Missing ' + field.to_s + ' field',
                    action: ['Retry']) unless value

    value
  end
end
