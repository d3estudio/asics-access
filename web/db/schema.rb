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

ActiveRecord::Schema.define(version: 20160624223433) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "guests", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "invite_token"
    t.string   "qr_code"
    t.string   "occupation"
    t.boolean  "rsvp"
    t.boolean  "presence"
    t.boolean  "vegetarian"
    t.boolean  "alcohol"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "language"
    t.datetime "removed_at"
  end

  create_table "logs", force: :cascade do |t|
    t.integer  "guest_id"
    t.integer  "action"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["guest_id"], name: "index_logs_on_guest_id", using: :btree
  end

  add_foreign_key "logs", "guests"
end
