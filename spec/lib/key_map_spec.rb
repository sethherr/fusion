require 'spec_helper'

describe KeyMap do
  describe 'array' do
    it 'returns an array of the keys' do
      expect(KeyMap.array.count).to be >= 275
      target_keys = [
        'Key Display Mac',
        'Key Display Windows',
        'Description',
        'Category',
        'c definition',
        'JS Keycode'
      ]
      expect(KeyMap.array.first.to_hash.keys).to eq target_keys
    end
  end

  describe 'spreadsheet_path' do
    it 'returns a string' do
      expect(KeyMap.spreadsheet_path).to eq Rails.root.join('lib', 'key_map', 'key_map.csv')
    end
  end

  context 'system key' do
    let(:key_hash) do
      {
        'Key Display Mac' => '⌘',
        'Key Display Windows' => 'Windows key',
        'Description' => 'Mac/windows key',
        'Category' => 'Modifiers',
        'c definition' => 'KC_RGUI',
        'JS Keycode' => '92'
      }
    end

    describe 'mac_hash_map' do
      it 'returns the hash we expect' do
        target = {
          value: 'KC_RGUI',
          label: '⌘',
          description: 'Mac/windows key',
          keycode: 92,
          category: 'Modifiers'
        }
        expect(KeyMap.mac_hash_map(key_hash)).to eq target
      end
    end
    describe 'windows_hash_map' do
      it 'returns the hash we expect' do
        target = {
          value: 'KC_RGUI',
          label: 'Windows key',
          description: 'Mac/windows key',
          keycode: 92,
          category: 'Modifiers'
        }
        expect(KeyMap.windows_hash_map(key_hash)).to eq target
      end
    end
    describe 'keycodesjs' do
      it 'returns the hash we expect' do
        target = {
          value: 'KC_RGUI',
          label: '&#x2318;',
          keycode: 92,
          category: 'mods'
        }
        expect(KeyMap.keycodesjs_hash_map(key_hash)).to eq target
      end
    end
  end
end
