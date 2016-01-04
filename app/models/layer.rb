class Layer < ActiveRecord::Base
  belongs_to :layout
  has_many :keys, dependent: :destroy
  accepts_nested_attributes_for :keys, reject_if: :all_blank, allow_destroy: true

  validates :description, presence: true
  validates :layout, presence: true

  attr_writer :properties
end
