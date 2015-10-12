class AddStatusToTheProblem < ActiveRecord::Migration
  def change
    add_column :problems, :edit_status, :boolean, default: false
    add_column :problems, :completion, :boolean, default: false
  end
end
