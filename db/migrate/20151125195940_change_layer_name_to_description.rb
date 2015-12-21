class ChangeLayerNameToDescription < ActiveRecord::Migration
  def change
    rename_column :layers, :name, :description
  end
end
