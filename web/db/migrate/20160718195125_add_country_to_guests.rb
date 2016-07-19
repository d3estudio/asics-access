class AddCountryToGuests < ActiveRecord::Migration[5.0]
  def change
    add_column :guests, :country, :string
  end
end
