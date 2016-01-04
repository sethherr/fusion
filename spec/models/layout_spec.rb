require 'spec_helper'

describe Layout, type: :model do
  it { is_expected.to belong_to :keyboard }
  it { is_expected.to have_many :layers }
  it { is_expected.to have_many :keys }
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
  describe 'with keyboard json' do
    include_context :keyboard_json_fixtures
    describe 'remapped_json' do
      it 'remaps ergodox_ez json' do
        remapped = Layout.remap_json(JSON.parse(ergodox_ez_json))
        expect(remapped['layers_attributes'].first['keys_attributes']).to be_present
      end
    end

    describe 'ergodox_ez factory' do
      # This is failing because the layer has 84 keys. Which is a problem with the
      # JSON that is in reactor and here.
      it 'creates a ergodox_ez with layers and keys as expected' do
        layout = FactoryGirl.create(:ergodox_ez_layout)
        expect(layout.layers.first.keys.count).to eq 76
        expect(layout.kind).to eq(Keyboard.ergodox_ez)
      end
    end
  end
end
