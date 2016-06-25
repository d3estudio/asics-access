class AddRemovedAtToGuests < ActiveRecord::Migration[5.0]
  def change
    add_column :guests, :removed_at, :datetime
  end
end
