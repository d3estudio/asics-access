class CreateGuests < ActiveRecord::Migration[5.0]
  def change
    create_table :guests do |t|
      t.string :name
      t.string :email
      t.string :invite_token
      t.string :qr_code
      t.boolean :rsvp
      t.boolean :presence
      t.boolean :vegetarian
      t.boolean :alcohol

      t.timestamps
    end
  end
end
