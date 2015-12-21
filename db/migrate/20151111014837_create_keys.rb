class CreateKeys < ActiveRecord::Migration
  def change
    create_table :keys do |t|
      t.string :keycode
      t.integer :position
      t.integer :layer_id
      t.timestamps
    end
  end
end
