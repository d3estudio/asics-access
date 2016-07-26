class CommonMailer < ApplicationMailer
  default from: "\"ASICS Hub\" <no-reply@asicshub.com.br>"



  def invite_email(user)
    @user = user

    @strings = get_invite_strings
    mail(to: @user.email, subject: 'ASICS Hub: Convite')
  end

  def confirm_email(user)
    @user = user
    get_qr_code_html_string user.qr_code
    @strings = get_confirm_strings
    mail(to: @user.email, subject: 'ASICS Hub: Confirmação')
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
        img_01: Rails.configuration.custom_base_url + 'images/email/invitation/en/asics_01.jpg',
        img_02: Rails.configuration.custom_base_url + 'images/email/invitation/en/asics_02.jpg?v=2',
        img_03: Rails.configuration.custom_base_url + 'images/email/invitation/en/asics_03.jpg?v=2',
        img_04: Rails.configuration.custom_base_url + 'images/email/invitation/en/asics_04.jpg?v=2',
        img_05: Rails.configuration.custom_base_url + 'images/email/invitation/en/asics_05.jpg',
        img_06: Rails.configuration.custom_base_url + 'images/email/invitation/en/asics_06.jpg',
        salutation: 'Dear GUEST',
        intro: 'It gives us great pleasure to invite you to our ASICS Hub during the 2016 Rio Olympics.
                The name implies exactly what it means: a hub that will bring together all the pillars that
                make ASICS the preferred choice for dedicated athletes: our history, sports, athletes, new products,
                design and performance. Not to mention a complete hospitality experience with fantastic food, drink,
                entertainment and interactions.',
        link: 'Click on the link below to confirm your attendance and to receive the access code.',
        when: 'WHEN: AUGUST 03RD UNTIL AUGUST 21ST, FROM 12PM TO 10PM',
        where: 'WHERE: EST. BOCA DO MATO, 803, VARGEM PEQUENA - RIO DE JANEIRO',
        schedule: 'Learn more about our schedule here:',
        explanation: 'You are receiving this message because you were invited to enjoy the ASICS Hub on Rio 2016 Olympics.'
      },
      PT: {
        img_01: Rails.configuration.custom_base_url + 'images/email/invitation/pt/asics_01.jpg',
        img_02: Rails.configuration.custom_base_url + 'images/email/invitation/pt/asics_02.jpg?v=2',
        img_03: Rails.configuration.custom_base_url + 'images/email/invitation/pt/asics_03.jpg?v=2',
        img_04: Rails.configuration.custom_base_url + 'images/email/invitation/pt/asics_04.jpg?v=2',
        img_05: Rails.configuration.custom_base_url + 'images/email/invitation/pt/asics_05.jpg',
        img_06: Rails.configuration.custom_base_url + 'images/email/invitation/pt/asics_06.jpg',
        salutation: 'Caro CONVIDADO',
        intro: 'Temos o grande prazer de convidá-lo para o ASICS Hub durante as Olimpíadas Rio 2016.
                O nome descreve exatamente o que vamos oferecer: um hub que vai unir todos os pilares que fazem a ASICS
                a escolha preferida entre atletas dedicados: nossa história, esportes, atletas, novos produtos,
                design e performance. Sem contar uma experiência de hospitalidade completa com comidas e bebidas
                incríveis, entretenimento e outras interações.',
        link: 'Clique no link abaixo para confirmar sua presença e receba o código de acesso.',
        when: 'QUANDO: 03 DE AGOSTO A 21 DE AGOSTO, DAS 12hs ÀS 22hs',
        where: 'ONDE: EST. BOCA DO MATO, 803, VARGEM PEQUENA - RIO DE JANEIRO',
        schedule: 'Conheça mais sobre nossa programação:',
        explanation: 'Você está recebendo esta mensagem por ter sido convidado(a) para desfrutar do ASICS Hub nos Jogos Olímpicos Rio 2016.'
      }
    }

    lang = @user.language
    invite_strings[lang.to_sym]
  end

  def get_confirm_strings
    confirm_strings = {
      EN: {
        img_01: Rails.configuration.custom_base_url + 'images/email/confirmation/en/asics_01.jpg',
        img_02_lefthand: Rails.configuration.custom_base_url + 'images/email/confirmation/en/asics_02_lefthand.jpg',
        img_02_righthand: Rails.configuration.custom_base_url + 'images/email/confirmation/en/asics_02_righthand.jpg',
        img_03: Rails.configuration.custom_base_url + 'images/email/confirmation/en/asics_03.jpg',
        img_04_btprint: Rails.configuration.custom_base_url + 'images/email/confirmation/en/asics_04_btprint.jpg',
        img_04_btwallet: Rails.configuration.custom_base_url + 'images/email/confirmation/en/asics_04_btwallet.jpg',
        img_04_center: Rails.configuration.custom_base_url + 'images/email/confirmation/en/asics_04_center.jpg',
        img_04_left: Rails.configuration.custom_base_url + 'images/email/confirmation/en/asics_04_left.jpg',
        img_04_right: Rails.configuration.custom_base_url + 'images/email/confirmation/en/asics_04_right.jpg',
        img_05: Rails.configuration.custom_base_url + 'images/email/confirmation/en/asics_05.jpg',
        img_06: Rails.configuration.custom_base_url + 'images/email/confirmation/en/asics_06.jpg',
        img_07: Rails.configuration.custom_base_url + 'images/email/confirmation/en/asics_07.jpg?v=2',
        img_08: Rails.configuration.custom_base_url + 'images/email/confirmation/en/asics_08.jpg',
        salutation: 'Dear GUEST',
        intro: 'This code is your entry to the ASICS Hub. Make sure you bring it with you.',
        welcome: 'It gives us great pleasure to invite you to our ASICS Hub during the 2016 Rio Olympics.
                  The name implies exactly what it means: a hub that will bring together all the pillars that
                  make ASICS the preferred choice for dedicated athletes: our history, sports, athletes, new products,
                  design and performance. Not to mention a complete hospitality experience with fantastic food, drink,
                  entertainment and interactions.',
        when: 'WHEN: AUGUST 03RD UNTIL AUGUST 21ST, FROM 12PM TO 10PM',
        where: 'WHERE: EST. BOCA DO MATO, 803, VARGEM PEQUENA - RIO DE JANEIRO',
        schedule: 'Learn more about our schedule here:',
        explanation: 'You are receiving this message because you were invited to enjoy the ASICS Hub on Rio 2016 Olympics.'

      },
      PT: {
        img_01: Rails.configuration.custom_base_url + 'images/email/confirmation/pt/asics_01.jpg',
        img_02_lefthand: Rails.configuration.custom_base_url + 'images/email/confirmation/pt/asics_02_lefthand.jpg',
        img_02_righthand: Rails.configuration.custom_base_url + 'images/email/confirmation/pt/asics_02_righthand.jpg',
        img_03: Rails.configuration.custom_base_url + 'images/email/confirmation/pt/asics_03.jpg',
        img_04_btprint: Rails.configuration.custom_base_url + 'images/email/confirmation/pt/asics_04_btprint.jpg',
        img_04_btwallet: Rails.configuration.custom_base_url + 'images/email/confirmation/pt/asics_04_btwallet.jpg',
        img_04_center: Rails.configuration.custom_base_url + 'images/email/confirmation/pt/asics_04_center.jpg',
        img_04_left: Rails.configuration.custom_base_url + 'images/email/confirmation/pt/asics_04_left.jpg',
        img_04_right: Rails.configuration.custom_base_url + 'images/email/confirmation/pt/asics_04_right.jpg',
        img_05: Rails.configuration.custom_base_url + 'images/email/confirmation/pt/asics_05.jpg',
        img_06: Rails.configuration.custom_base_url + 'images/email/confirmation/pt/asics_06.jpg',
        img_07: Rails.configuration.custom_base_url + 'images/email/confirmation/pt/asics_07.jpg?v=2',
        img_08: Rails.configuration.custom_base_url + 'images/email/confirmation/pt/asics_08.jpg',
        salutation: 'Caro CONVIDADO',
        intro: 'Este código garante seu acesso para o Asics Hub. Não se esqueça de levá-lo.',
        welcome: 'Temos o grande prazer de convidá-lo para o ASICS Hub durante as Olimpíadas Rio 2016.
                        O nome descreve exatamente o que vamos oferecer: um hub que vai unir todos os pilares que fazem a ASICS
                        a escolha preferida entre atletas dedicados: nossa história, esportes, atletas, novos produtos,
                        design e performance. Sem contar uma experiência de hospitalidade completa com comidas e bebidas
                        incríveis, entretenimento e outras interações.',
        when: 'QUANDO: 03 DE AGOSTO A 21 DE AGOSTO, DAS 12hs ÀS 22hs',
        where: 'ONDE: EST. BOCA DO MATO, 803, VARGEM PEQUENA - RIO DE JANEIRO',
        schedule: 'Conheça mais sobre nossa programação:',
        explanation: 'Você está recebendo esta mensagem por ter sido convidado(a) para desfrutar do ASICS Hub nos Jogos Olímpicos Rio 2016.'
      }
    }

    lang = @user.language
    confirm_strings[lang.to_sym]
  end
end
