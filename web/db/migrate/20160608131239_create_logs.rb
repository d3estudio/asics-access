class CreateLogs < ActiveRecord::Migration[5.0]
  def change
    enable_extension 'uuid-ossp'

    create_table :logs, id: :uuid do |t|
      t.references :guest, foreign_key: true
      t.integer :action

      t.timestamps
    end
  end
end
