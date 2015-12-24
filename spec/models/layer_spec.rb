require 'spec_helper'

describe Layer, type: :model do
  it { is_expected.to belong_to :layout }
  it { is_expected.to have_many :keys }
  it { is_expected.to accept_nested_attributes_for :keys }
  it { is_expected.to validate_presence_of :description }
  it { is_expected.to validate_presence_of :layout }
end
