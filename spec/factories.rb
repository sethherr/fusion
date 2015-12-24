FactoryGirl.define do
  factory :key do
  end

  factory :layout do
    keyboard
  end

  factory :keyboard do
    sequence(:name) { |n| "keyboard #{n}" }
    key_count 104
    factory :keyboard_ergodox do
      key_count 76
    end
  end
end
