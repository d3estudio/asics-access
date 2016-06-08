# == Schema Information
#
# Table name: guests
#
#  id           :integer          not null, primary key
#  name         :string
#  email        :string
#  invite_token :string
#  qr_code      :string
#  rsvp         :boolean
#  presence     :boolean
#  vegetarian   :boolean
#  alcohol      :boolean
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Guest < ApplicationRecord
  has_many :logs
  before_validation :fill_fields

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  # ...


  private
    def fill_fields
      invite_token = Digest::SHA1.hexdigest([Time.now, rand].join) if invite_token.nil?
      rsvp = false if rsvp.nil?
      presence = false if presence.nil?
      # ...
    end
end
