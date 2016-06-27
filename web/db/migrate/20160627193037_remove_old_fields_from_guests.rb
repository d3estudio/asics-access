class RemoveOldFieldsFromGuests < ActiveRecord::Migration[5.0]
  def change
    remove_column :guests, :presence, :boolean
    remove_column :guests, :vegetarian, :boolean
    remove_column :guests, :alcohol, :boolean
  end
end
