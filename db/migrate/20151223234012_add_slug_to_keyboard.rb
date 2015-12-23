class AddSlugToKeyboard < ActiveRecord::Migration
  def change
    add_column :keyboards, :slug, :string
  end
end
