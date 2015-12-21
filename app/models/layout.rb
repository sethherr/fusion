class Layout < ActiveRecord::Base

  belongs_to :keyboard
  has_many   :layers
  accepts_nested_attributes_for :layers, reject_if: :all_blank, allow_destroy: true

  validates :name, presence: true
  #validates :keyboard, presence: true

end
