class CommonMailer < ApplicationMailer
  default from: "\"ASICS Hub\" <rsvp@asicshub.com.br>"



  def invite_email(user)
    @user = user

    @strings = get_invite_strings
    mail(to: @user.email, subject: 'Invitation Asics Hub')
  end

  def confirm_email(user)
    @user = user
    get_qr_code_html_string user.qr_code
    @strings = get_confirm_strings
    mail(to: @user.email, subject: 'Here\'s your entry code')
  end



  private

  def get_qr_code_html_string(qr_code)
      qr = RQRCode::QRCode.new( qr_code, :size => 2, :level => :q )
      qr_string = ''

      qr.modules.each do |row|
          qr_string << '<tr>'
          row.each do |col|
               qr_string << '<td width="4" height="4" bgcolor="'
               qr_string << ( col ? "black" : "white" )
               qr_string << '"></td>'
          end
          qr_string << '</tr>'
      end

      @qr_code_html = qr_string
  end

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
