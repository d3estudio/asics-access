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

require 'test_helper'

class LogTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
