# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151224005416) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "keyboards", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "key_count"
    t.string   "slug"
  end

  create_table "keys", force: :cascade do |t|
    t.string   "code"
    t.integer  "position"
    t.integer  "layer_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "label"
  end

  create_table "layers", force: :cascade do |t|
    t.string   "description"
    t.integer  "layout_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "stack_position"
  end

  create_table "layouts", force: :cascade do |t|
    t.string   "name"
    t.integer  "keyboard_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "description"
  end

end
