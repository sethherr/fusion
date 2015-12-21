class AddKeyCountToKeyboards < ActiveRecord::Migration
  def change
    add_column :keyboards, :key_count, :integer
  end
end
