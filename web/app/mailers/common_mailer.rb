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
        img_01: 'http://asicshub.com.br/images/email/invitation/en/asics_01.jpg',
        img_02: 'http://asicshub.com.br/images/email/invitation/en/asics_02.jpg',
        img_03: 'http://asicshub.com.br/images/email/invitation/en/asics_03.jpg',
        img_04: 'http://asicshub.com.br/images/email/invitation/en/asics_04.jpg',
        img_05: 'http://asicshub.com.br/images/email/invitation/en/asics_05.jpg',
        img_06: 'http://asicshub.com.br/images/email/invitation/en/asics_06.jpg'
      },
      PT: {
        img_01: 'http://asicshub.com.br/images/email/invitation/pt/asics_01.jpg',
        img_02: 'http://asicshub.com.br/images/email/invitation/pt/asics_02.jpg',
        img_03: 'http://asicshub.com.br/images/email/invitation/pt/asics_03.jpg',
        img_04: 'http://asicshub.com.br/images/email/invitation/pt/asics_04.jpg',
        img_05: 'http://asicshub.com.br/images/email/invitation/pt/asics_05.jpg',
        img_06: 'http://asicshub.com.br/images/email/invitation/pt/asics_06.jpg'
      }
    }

    lang = @user.language
    invite_strings[lang.to_sym]
  end

  def get_confirm_strings
    confirm_strings = {
      EN: {
        img_01: 'http://asicshub.com.br/images/email/invitation/en/asics_01.jpg',
        img_02_lefthand: 'http://asicshub.com.br/images/email/invitation/en/asics_02_lefthand.jpg',
        img_02_righthand: 'http://asicshub.com.br/images/email/invitation/en/asics_02_righthand.jpg',
        img_03: 'http://asicshub.com.br/images/email/invitation/en/asics_03.jpg',
        img_04_btprint: 'http://asicshub.com.br/images/email/invitation/en/asics_04_btprint.jpg',
        img_04_btwallet: 'http://asicshub.com.br/images/email/invitation/en/asics_04_btwallet.jpg',
        img_04_center: 'http://asicshub.com.br/images/email/invitation/en/asics_04_center.jpg',
        img_04_left: 'http://asicshub.com.br/images/email/invitation/en/asics_04_left.jpg',
        img_04_right: 'http://asicshub.com.br/images/email/invitation/en/asics_04_right.jpg',
        img_05: 'http://asicshub.com.br/images/email/invitation/en/asics_05.jpg',
        img_06: 'http://asicshub.com.br/images/email/invitation/en/asics_06.jpg',
        img_07: 'http://asicshub.com.br/images/email/invitation/en/asics_07.jpg',
        img_08: 'http://asicshub.com.br/images/email/invitation/en/asics_08.jpg'
      },
      PT: {
        img_01: 'http://asicshub.com.br/images/email/invitation/pt/asics_01.jpg',
        img_02_lefthand: 'http://asicshub.com.br/images/email/invitation/pt/asics_02_lefthand.jpg',
        img_02_righthand: 'http://asicshub.com.br/images/email/invitation/pt/asics_02_righthand.jpg',
        img_03: 'http://asicshub.com.br/images/email/invitation/pt/asics_03.jpg',
        img_04_btprint: 'http://asicshub.com.br/images/email/invitation/pt/asics_04_btprint.jpg',
        img_04_btwallet: 'http://asicshub.com.br/images/email/invitation/pt/asics_04_btwallet.jpg',
        img_04_center: 'http://asicshub.com.br/images/email/invitation/pt/asics_04_center.jpg',
        img_04_left: 'http://asicshub.com.br/images/email/invitation/pt/asics_04_left.jpg',
        img_04_right: 'http://asicshub.com.br/images/email/invitation/pt/asics_04_right.jpg',
        img_05: 'http://asicshub.com.br/images/email/invitation/pt/asics_05.jpg',
        img_06: 'http://asicshub.com.br/images/email/invitation/pt/asics_06.jpg',
        img_07: 'http://asicshub.com.br/images/email/invitation/pt/asics_07.jpg',
        img_08: 'http://asicshub.com.br/images/email/invitation/pt/asics_08.jpg'
      }
    }

    lang = @user.language
    confirm_strings[lang.to_sym]
  end
end
