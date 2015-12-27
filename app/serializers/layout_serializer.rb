class LayoutSerializer < ActiveModel::Serializer
  attributes :id,
             :kind,
             :description,
             :properties

  has_many :layers

  def properties
    {}
  end

  def kind
    object.kind_slug
  end
end
