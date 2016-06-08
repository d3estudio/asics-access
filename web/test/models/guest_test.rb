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

require 'test_helper'

class GuestTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
