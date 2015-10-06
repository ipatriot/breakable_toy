class CreateANewProblem < ActiveRecord::Migration
  def change
    create_table :problems do |t|
      t.string :name, null: false
      t.string :location, null: false
      t.timestamps

    end
  end
end
