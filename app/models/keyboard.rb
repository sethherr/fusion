class Keyboard < ActiveRecord::Base

  has_many :layouts

  validates :name, presence: true
  validates :key_count, numericality: true

end
