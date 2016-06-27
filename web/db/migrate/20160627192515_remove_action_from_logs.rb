class RemoveActionFromLogs < ActiveRecord::Migration[5.0]
  def change
    remove_column :logs, :action, :integer
  end
end
