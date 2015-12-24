class LayerSerializer < ActiveModel::Serializer
  attributes :description,
             :properties

  has_many :keys

  def properties
    {}
  end
end
