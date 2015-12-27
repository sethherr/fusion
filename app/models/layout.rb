class Layout < ActiveRecord::Base
  belongs_to :keyboard
  has_many :layers
  accepts_nested_attributes_for :layers, reject_if: :all_blank, allow_destroy: true

  validates :name, presence: true

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
