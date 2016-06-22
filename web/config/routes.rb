Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post '/api/rsvp/confirm', to: 'rsvp#confirm_invite'

  get '/api/rsvp/guest', to: 'rsvp#get_guest_by_token'

  post '/api/admin/invite', to: 'admin#invite_guest'

  post '/api/gateway/guests/since', to: 'gateway#get_guests_updated_since'
  get '/api/gateway/guests/all', to: 'gateway#get_all_guests'

  root to: 'welcome#index'
  get '*path', to: 'welcome#index'
end
