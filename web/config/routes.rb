Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post '/api/rsvp/confirm', to: 'rsvp#confirm_invite'
  get '/api/rsvp/guest', to: 'rsvp#get_guest_by_token'

  post '/api/admin/invite', to: 'admin#invite_guest'
  get '/api/admin/guests', to: 'admin#get_guests_information'

  post '/api/gateway/guests/since', to: 'gateway#get_guests_updated_since'
  get '/api/gateway/guests/all', to: 'gateway#get_all_guests'
  post '/api/gateway/logs/log', to: 'gateway#log_logs'

  get '*path', to: 'application#layout'
  root to: 'application#layout'
end
