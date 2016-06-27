class AddAccessTokenToLogs < ActiveRecord::Migration[5.0]
  def change
    add_column :logs, :access_token, :string
  end
end
