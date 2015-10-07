class AddLatLongToProblems < ActiveRecord::Migration
  def up
    add_column :problems, :latitude, :string
    add_column :problems, :longitude, :string
  end

  def down
    remove_column :problems, :latitude
    remove_column :problems, :longitude
  end
end
