module Sluggable
  extend ActiveSupport::Concern
  included do
    before_validation :set_slug
  end

  module ClassMethods
    def slug_replace_hash
      {
        "('|`)" => '',
        '\+' => 'plus',
        '([^A-Za-z0-9])' => ' '
      }
    end

    def slugify(str)
      return '' unless str.present?
      str = I18n.transliterate(str.downcase)
      slug_replace_hash.keys.each do |k|
        str.gsub!(/#{k}/i, slug_replace_hash[k])
      end
      str.strip.gsub(/\s+/, '_') # strip and then turn any length of spaces into underscores
    end

    def friendly_find(n)
      return nil unless n.present?
      integer_slug?(n) ? find(n) : find_by_slug(slugify(n))
    end

    def friendly_find_id(n)
      s = friendly_find(n)
      s.present? ? s.id : nil
    end

    def integer_slug?(n)
      n.is_a?(Integer) || n.match(/\A\d*\z/).present?
    end
  end

  def set_slug
    new_slug = self.class.slugify(name)
    non_self = id.present? ? self.class.where.not(id: id) : self.class
    while non_self.where(slug: new_slug).exists?
      new_slug = increment_slug(new_slug)
    end
    self.slug = new_slug
  end

  def increment_slug(new_slug)
    count = new_slug[/\d+\z/]
    count = count.present? ? count[0].to_i + 1 : 2
    "#{new_slug.gsub(/_\d+\z/, '')}_#{count}"
  end
end
