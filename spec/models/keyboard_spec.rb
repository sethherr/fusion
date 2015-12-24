require 'spec_helper'

describe Keyboard, type: :model do
  it { is_expected.to have_many :layouts }
  it { is_expected.to validate_presence_of :name }
  it { is_expected.to validate_numericality_of :key_count }

  describe 'keyboard factories' do
    context 'ergodox' do
      it 'makes a keyboard' do
        keyboard = FactoryGirl.create(:keyboard_ergodox)
        expect(keyboard).to be_present
      end
    end
  end
end
