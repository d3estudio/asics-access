class CommonMailer < ApplicationMailer
  default from: "rsvp@asicshub.com.br"



  def invite_email(user)
    @user = user

    @strings = get_invite_strings
    mail(to: @user.email, subject: 'Convite Asics Hub')
  end

  def confirm_email(user)
    @user = user

    @strings = get_confirm_strings
    @qr_code = RQRCode::QRCode.new( user.qr_code, :size => 5, :level => :h )
    @qr_code_html = @qr_code.as_html
    mail(to: @user.email, subject: 'Confirmação Asics Hub')
  end



  private

  def get_invite_strings
    invite_strings = {
      EN: {
        confirm_button: 'CONFIRM ATTENDANCE'
      },
      PT: {
        confirm_button: 'CONFIRMAR PRESENÇA'
      }
    }

    lang = @user.language
    invite_strings[lang.to_sym]
  end

  def get_confirm_strings
    confirm_strings = {
      EN: {

      },
      PT: {

      }
    }

    lang = @user.language
    confirm_strings[lang.to_sym]
  end
end
