Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # RSVP
  post '/api/rsvp/confirm', to: 'rsvp#confirm_invite'
  get '/api/rsvp/guest', to: 'rsvp#get_guest_by_token'


  # ADMIN
  post '/api/admin/invite', to: 'admin#invite_guest'
  post '/api/admin/invite/companion', to: 'admin#invite_guest_companion'
  
  post '/api/admin/invite/csv', to: 'admin#invite_guests_csv'
  post '/api/admin/spreadsheet/send', to: 'admin#send_spreadsheet'

  post '/api/admin/guests/search', to: 'admin#search_guests_information'
  get  '/api/admin/guests/all', to: 'admin#get_guests_information'
  post '/api/admin/guests/email', to: 'admin#resend_email_to_guest'
  post '/api/admin/guests/delete', to: 'admin#delete_guest'

  post '/api/admin/logs/search', to: 'admin#search_logs_information'
  get  '/api/admin/logs/all', to: 'admin#get_logs_information'

  get  '/api/admin/report/byday', to: 'admin#get_report_information'


  # GATEWAY
  post '/api/gateway/guests/since', to: 'gateway#get_guests_updated_since'
  post '/api/gateway/guests/all', to: 'gateway#get_all_guests'

  post '/api/gateway/logs/log', to: 'gateway#post_logs'
  post '/api/gateway/logs/all', to: 'gateway#get_all_logs'
  post '/api/gateway/logs/since', to: 'gateway#get_logs_created_since'
  post '/api/gateway/logs/other', to: 'gateway#get_other_logs_created_since'


  # FILES
  get '/files/passbook', to: 'rsvp#generate_passbook_from_qrcode'
  get '/files/admin/guests', to: 'admin#get_guests_csv'

  get '*path', to: 'application#layout'
  root to: 'application#layout'
end
