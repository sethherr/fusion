require 'spec_helper'

describe Layout, type: :model do
  it { is_expected.to belong_to :keyboard }
  it { is_expected.to have_many :layers }
end
