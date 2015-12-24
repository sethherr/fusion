class KeySerializer < ActiveModel::Serializer
  attributes :code,
             :label,
             :position
end
