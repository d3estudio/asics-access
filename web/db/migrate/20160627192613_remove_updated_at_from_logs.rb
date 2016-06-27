class RemoveUpdatedAtFromLogs < ActiveRecord::Migration[5.0]
  def change
    remove_column :logs, :updated_at, :datetime
  end
end
