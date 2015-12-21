class AddStackPositionToLayers < ActiveRecord::Migration
  def change
    add_column :layers, :stack_position, :integer
  end
end
