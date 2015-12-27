class AddDescriptionToLayouts < ActiveRecord::Migration
  def change
    add_column :layouts, :description, :text
  end
end
