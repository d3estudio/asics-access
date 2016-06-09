Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post '/rsvp/confirm', to: 'rsvp#confirm_invite'
  post '/rsvp/invite', to: 'rsvp#invite_guest'

  root to: 'welcome#index'
  get '*path', to: 'welcome#index'
end
