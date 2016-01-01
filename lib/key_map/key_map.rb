class KeyMap
  require 'htmlentities'
  require 'csv'
  class << self
    def array
      @array ||= parse_key_map
    end

    def parse_key_map
      CSV.read(spreadsheet_path, headers: true)
    end

    def spreadsheet_path
      Rails.root.join('lib', 'key_map', 'key_map.csv')
    end

    def mac_hash_map(key_hash)
      {
        value: key_hash['c definition'],
        label: key_hash['Key Display Mac'],
        description: key_hash['Description'],
        keycode: key_hash['JS Keycode'].to_i,
        category: key_hash['Category']
      }
    end

    def windows_hash_map(key_hash)
      {
        value: key_hash['c definition'],
        label: key_hash['Key Display Windows'],
        description: key_hash['Description'],
        keycode: key_hash['JS Keycode'].to_i,
        category: key_hash['Category']
      }
    end

    def keycodesjs_hash_map(key_hash)
      {
        value: key_hash['c definition'],
        label: HTMLEntities.new.encode(key_hash['Key Display Mac'], :hexadecimal),
        keycode: key_hash['JS Keycode'].to_i,
        category: categories_map[key_hash['Category']]
      }
    end

    def categories_map
      {
        'Toggle layer' => 'toggle',
        'Mometary layer switch' => 'momentary',
        'Layer switch' => 'layer',
        'Alphabet' => 'az',
        'Numeric' => '09',
        'Function keys' => 'f1',
        'Numpad' => 'num',
        'Punctuation' => 'punct',
        'Navigational' => 'nav',
        'Spacing' => 'spacing',
        'Modifiers' => 'mods',
        'System control' => 'system',
        'Media' => 'media',
        'Fn' => 'fn',
        'Mouse' => 'mouse',
        'Mouse wheel' => 'mousewheel',
        'Mouse acceleration' => 'mouseaccel',
        'Other' => 'other'
      }
    end
  end
end
