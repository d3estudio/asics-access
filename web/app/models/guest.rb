# == Schema Information
#
# Table name: guests
#
#  id           :integer          not null, primary key
#  name         :string
#  email        :string
#  invite_token :string
#  qr_code      :string
#  occupation   :string
#  language     :string
#  rsvp         :boolean
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  removed_at   :datetime
#

class Guest < ApplicationRecord
  has_many :logs
  before_validation :fill_fields

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true

  scope :not_removed, -> { where(removed_at: nil) }
  scope :updated_after, -> (time) { where("updated_at > ?", time) }

  def generate_qr_code
      self.qr_code = Digest::SHA1.hexdigest([Time.now, rand].join).last(20)
      self.qr_codes_generated += 1
  end

  private
    def fill_fields
      self.invite_token = Digest::SHA1.hexdigest([Time.now, rand].join) if self.invite_token.nil?
      self.rsvp = false if self.rsvp.nil?
      self.qr_codes_generated = 0 if self.qr_codes_generated.nil?
    end
end
