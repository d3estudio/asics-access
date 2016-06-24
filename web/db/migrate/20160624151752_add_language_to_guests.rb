class AddLanguageToGuests < ActiveRecord::Migration[5.0]
  def change
    add_column :guests, :language, :string
  end
end
