class CommonMailer < ApplicationMailer
  default from: "rsvp@asicshub.com.br"

  def confirm_email(user)
    @user = user
    mail(to: @user.email, subject: 'Confirmação Asics Hub')
  end

  def invite_email(user)
    @user = user
    mail(to: @user.email, subject: 'Convite Asics Hub')
  end
end
