require 'spec_helper'

describe Layer, type: :model do
  it { is_expected.to belong_to :layout }
end
