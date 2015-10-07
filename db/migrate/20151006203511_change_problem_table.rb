class ChangeProblemTable < ActiveRecord::Migration
  def change
    remove_column(:problems, :location)
  end
end
