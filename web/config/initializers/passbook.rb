require 'passbook'

keys_path = Rails.root.join('config', 'passbook')

Passbook.configure do |passbook|
  # Path to your wwdc cert file
  passbook.wwdc_cert = File.join(keys_path, 'wwdrca.pem')

  # Key for signing the file
  passbook.p12_key = File.join(keys_path, 'passkey.pem')

  # Path to your cert.p12 file
  passbook.p12_certificate = File.join(keys_path, 'passcertificate.pem')

  # Password for your certificate
  passbook.p12_password = ENV['PASSBOOK_CERTIFICATE_PASSWORD']
end
