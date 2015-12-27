class Key < ActiveRecord::Base
  belongs_to :layer
  acts_as_list scope: :layer
end
