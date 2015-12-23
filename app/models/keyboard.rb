class Keyboard < ActiveRecord::Base
  include Sluggable
  has_many :layouts

  validates :name, presence: true
  validates :key_count, numericality: true

  def self.ergodox_ez
    ergo = friendly_find('ErgoDox EZ')
    ergo.present? ? ergo : create(name: 'ErgoDox EZ', key_count: 76)
  end

  def to_param
    slug
  end
end
