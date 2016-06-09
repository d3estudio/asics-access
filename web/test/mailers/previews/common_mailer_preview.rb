# Preview all emails at http://localhost:3000/rails/mailers/common_mailer
class CommonMailerPreview < ActionMailer::Preview
  def invite_mail_preview
    CommonMailer.invite_email(Guest.first)
  end

  def confirm_mail_preview
    CommonMailer.confirm_email(Guest.first)
  end
end
