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



  scope :updated_after, -> (time) { where("updated_at > ?", time) }

  private
    def fill_fields
      self.invite_token = Digest::SHA1.hexdigest([Time.now, rand].join) if self.invite_token.nil?
      self.rsvp = false if self.rsvp.nil?
      self.presence = false if self.presence.nil?
      # ...
    end
end
