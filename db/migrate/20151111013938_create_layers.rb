class CreateLayers < ActiveRecord::Migration
  def change
    create_table :layers do |t|
      t.string :name
      t.integer :layout_id
      t.timestamps
    end
  end
end
