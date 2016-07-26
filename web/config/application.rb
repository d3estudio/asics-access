require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module AsicsAccess
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded

    config.custom_base_url = ENV['CUSTOM_BASE_URL'] ? ENV['CUSTOM_BASE_URL'] : 'http://www.asicshub.com.br'
    puts "BASE_URL: " + Rails.configuration.custom_base_url
  end
end
