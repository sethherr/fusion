require 'spec_helper'

describe Layout, type: :model do
  it { is_expected.to belong_to :keyboard }
  it { is_expected.to have_many :layers }
  it { is_expected.to validate_presence_of :name }
  it { is_expected.to accept_nested_attributes_for :layers }

  describe 'kind reader' do
    it 'reads the name of the Keyboard from the keyboard' do
      keyboard = Keyboard.new(name: 'cool name')
      layout = Layout.new
      allow(layout).to receive(:keyboard) { keyboard }
      expect(layout.kind).to eq 'cool name'
    end
    it 'does not error on nil' do
      expect(Layout.new.kind).to be_nil
    end
  end

  describe 'kind setter' do
    context 'existing keyboard' do
      it 'sets with friendly find' do
        keyboard = Keyboard.ergodox_ez
        expect(keyboard.name).to eq('ErgoDox EZ')
        layout = FactoryGirl.create(:layout)
        layout.kind = 'ErgoDox=EZ'
        expect(layout.keyboard).to eq(keyboard)
      end
    end
    context 'non existant keyboard' do
      it 'sets to nil' do
        layout = FactoryGirl.create(:layout)
        layout.kind = 'ErgoDOX SWEEER MAKING A NEW THING HERE'
        expect(layout.keyboard).to be_nil
      end
    end
  end
end
