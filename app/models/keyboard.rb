class Keyboard < ActiveRecord::Base
  include Sluggable
  has_many :layouts

  validates :name, presence: true
  validates :key_count, numericality: true

  def self.ergodox_ez
    k = friendly_find('ErgoDox EZ')
    k.present? ? k : create(name: 'ErgoDox EZ', key_count: 76)
  end

  def self.planck
    k = friendly_find('Planck')
    k.present? ? k : create(name: 'Planck', key_count: 84)
  end

  def to_param
    slug
  end
end
