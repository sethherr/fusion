class ChangeKeycodeToCode < ActiveRecord::Migration
  def change
    rename_column :keys, :keycode, :code
    add_column :keys, :label, :string
  end
end
