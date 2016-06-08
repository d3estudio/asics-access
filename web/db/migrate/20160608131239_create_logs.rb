class CreateLogs < ActiveRecord::Migration[5.0]
  def change
    create_table :logs do |t|
      t.references :guest, foreign_key: true
      t.integer :action

      t.timestamps
    end
  end
end
