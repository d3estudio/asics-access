# == Schema Information
#
# Table name: logs
#
#  id             :uuid          not null, primary key
#  guest_id       :integer
#  access_token   :string
#  created_at     :datetime         not null
#

class Log < ApplicationRecord
  belongs_to :guest

  validates :guest, presence: true
  validates :access_token, presence: true

  scope :created_after, -> (time) { where("created_at > ?", time) }
  scope :from_today, -> { where("created_at > ?", DateTime.now.beginning_of_day) }
  scope :from_and_until_selected_day, -> (datetime) { where("created_at > ? AND created_at < ? ", datetime.beginning_of_day, datetime.end_of_day) }
  scope :not_created_by, -> (access_token) { where("access_token != ? OR access_token IS NULL", access_token) }
end
