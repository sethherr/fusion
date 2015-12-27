FactoryGirl.define do
  factory :key do
  end

  factory :layer do
    sequence(:description) { |n| "layer #{n}" }
    layout
  end

  factory :layout do
    sequence(:name) { |n| "keyboard #{n}" }
  end

  factory :keyboard do
    sequence(:name) { |n| "keyboard #{n}" }
    key_count 104
  end
end
