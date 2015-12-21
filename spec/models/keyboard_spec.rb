require 'spec_helper'

describe Key, type: :model do
  it { is_expected.to belong_to :layer }
end
