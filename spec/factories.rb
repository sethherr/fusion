FactoryGirl.define do
  factory :key do
  end

  factory :layout do
    keyboard
  end

  factory :keyboard do
    sequence(:name) {|n| "keyboard #{n}"}
  end
end
