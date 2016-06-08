# == Schema Information
#
# Table name: logs
#
#  id         :integer          not null, primary key
#  guest_id   :integer
#  action     :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Log < ApplicationRecord
  belongs_to :guest

  validates :guest, presence: true
  validates :action, presence: true

  # TODO: Define any other actions here
  enum action: [ :created ]
end
