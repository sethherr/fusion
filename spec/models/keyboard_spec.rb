require 'spec_helper'

describe Keyboard, type: :model do
  it { is_expected.to have_many :layouts }
  it { is_expected.to validate_presence_of :name }
  it { is_expected.to validate_numericality_of :key_count }

  describe :slugify do
    it 'removes special characters and downcases, strips ending underscore' do
      slug = Keyboard.slugify("Wrigley's awe-some (party)")
      expect(slug).to eq('wrigleys_awe_some_party')
    end

    it 'removes diacritics so urls are easier' do
      slug = Keyboard.slugify('escuéla dêñå')
      expect(slug).to eq('escuela_dena')
    end

    it 'changes + to plus for URL safety' do
      slug = Keyboard.slugify('Coke+')
      expect(slug).to eq('cokeplus')
    end
  end

  describe :set_slug do
    it "protects from name collisions, without erroring because of it's own slug" do
      org1 = FactoryGirl.create(:keyboard, name: 'Keyboard layouT')
      org1.reload
      expect(org1.slug).to eq('keyboard_layout')
      org2 = FactoryGirl.create(:keyboard, name: 'Keyboard-Layout')
      org2.reload
      expect(org2.slug).to eq('keyboard_layout_2')
      org3 = FactoryGirl.create(:keyboard, name: 'Keyboard layout-')
      org3.reload
      expect(org3.slug).to eq('keyboard_layout_3')
    end

    it 'has before_validation_callback_method defined for set_slug' do
      expect(Keyboard._validation_callbacks.select { |cb| cb.kind.eql?(:before) }
        .map(&:raw_filter).include?(:set_slug)).to be_truthy
    end
  end

  describe :friendly_find do
    context 'integer_slug' do
      it 'finds the org' do
        n = rand(0..15)
        expect(Keyboard).to receive(:find).with(n)
        Keyboard.friendly_find(n)
      end
    end

    context 'not integer slug' do
      it 'finds the org by the slug' do
        n = 'foo'
        allow(Keyboard).to receive(:slugify) { 'bar' }
        expect(Keyboard).to receive(:find_by_slug).with('bar')
        Keyboard.friendly_find(n)
      end
    end
  end

  describe :integer_slug? do
    context 'given int' do
      it 'returns true' do
        int = rand(0..100)
        expect(Keyboard.integer_slug?(int)).to be_truthy
      end
    end

    context 'given string int' do
      it 'returns true' do
        int = rand(0..100).to_s
        expect(Keyboard.integer_slug?(int)).to be_truthy
      end
    end

    context 'word string' do
      it 'returns false' do
        int = 'partyTime'
        expect(Keyboard.integer_slug?(int)).to be false
      end
    end
  end
end
