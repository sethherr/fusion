class CreateLayouts < ActiveRecord::Migration
  def change
    create_table :layouts do |t|
      t.string :name
      t.integer :keyboard_id
      t.timestamps
    end
  end
end
