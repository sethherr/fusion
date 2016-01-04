class Layout < ActiveRecord::Base
  belongs_to :keyboard
  has_many :layers
  has_many :keys, through: :layers
  accepts_nested_attributes_for :layers, reject_if: :all_blank, allow_destroy: true

  validates :name, presence: true

  attr_writer :properties

  def self.remap_json(hash)
    hash = hash.with_indifferent_access
    hash.except(:layers).merge(remapped_layers(hash[:layers]))
  end

  def self.remapped_layers(layers_hash)
    { layers_attributes: remapped_layer_key_params(layers_hash) }
  end

  def self.remapped_layer_key_params(layers_hash)
    layers_hash.map do |layer|
      layer[:keys_attributes] = layer.delete(:keys)
      layer
    end
  end

  def kind
    keyboard && keyboard.name
  end

  def kind=(val)
    self.keyboard_id = Keyboard.friendly_find_id(val)
  end

  def kind_slug
    keyboard && keyboard.slug
  end

  before_validation :set_fallback_name
  def set_fallback_name
    self.name ||= description && description.truncate(50)
  end
end
