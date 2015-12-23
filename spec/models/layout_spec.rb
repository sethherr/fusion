require 'spec_helper'

describe Layout, type: :model do
  it { is_expected.to belong_to :keyboard }
  it { is_expected.to have_many :layers }
  it { is_expected.to validate_presence_of :name }
  it { is_expected.to accept_nested_attributes_for :layers }
end
