class CreateLogs < ActiveRecord::Migration[5.0]
  def change
    enable_extension 'uuid-ossp'

    create_table :logs, id: :uuid do |t|
      t.references :guest, foreign_key: true
      t.datetime :created_at
      t.string :access_token
    end
  end
end
