Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :rsvp

  root to: 'welcome#index'
  get '*path', to: 'welcome#index'
end
