class CreateGuests < ActiveRecord::Migration[5.0]
  def change
    create_table :guests do |t|
      t.string :name
      t.string :email
      t.string :invite_token
      t.string :qr_code
      t.integer :qr_codes_generated
      t.string :occupation
      t.boolean :rsvp

      t.timestamps
    end
  end
end
