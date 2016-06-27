Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post '/api/rsvp/confirm', to: 'rsvp#confirm_invite'
  get '/api/rsvp/guest', to: 'rsvp#get_guest_by_token'


  post '/api/admin/invite', to: 'admin#invite_guest'
  get '/api/admin/guests/all', to: 'admin#get_guests_information'
  post '/api/admin/guests/email', to: 'admin#resend_email_to_guest'
  post '/api/admin/guests/delete', to: 'admin#delete_guest'


  post '/api/gateway/guests/since', to: 'gateway#get_guests_updated_since'
  post '/api/gateway/guests/all', to: 'gateway#get_all_guests'

  post '/api/gateway/logs/log', to: 'gateway#post_logs'
  post '/api/gateway/logs/all', to: 'gateway#get_all_logs'
  post '/api/gateway/logs/since', to: 'gateway#get_logs_created_since'
  post '/api/gateway/logs/other', to: 'gateway#get_other_logs_created_since'


  get '*path', to: 'application#layout'
  root to: 'application#layout'
end
