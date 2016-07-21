class AdminMailer < ApplicationMailer
  default from: "\"Asics Hub\" <no-reply@asicshub.com.br>"

  def invite_csv_file_email(respond_to, file)
    mail_to = "no-reply@asicshub.com.br"
    subject = "Invite File to Parse"
    content = "File attached. Respond to: " + respond_to;

    attachments[file.name] = File.read(file.path)

    mail(to: mail_to, subject: subject) do |format|
      format.text { render text: content }
    end
  end
end
