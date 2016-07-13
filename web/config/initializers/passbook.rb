require 'passbook'

Passbook.configure do |passbook|

  # Path to your wwdc cert file
  passbook.wwdc_cert = Rails.root.join('config', 'certificates', 'wwdrca.pem')

  # Path to your cert.p12 file
  passbook.p12_certificate = Rails.root.join('config', 'certificates', 'pass_type_certificate.p12')

  # Password for your certificate
  # passbook.p12_password = 

  # Key for signing the file
  # passbook.p12_key = Rails.root.join('key.pem')
end
