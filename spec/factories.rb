def ergodox_ez_hash
  JSON.parse(File.read(Rails.root.join('spec/fixtures/ergodox_ez.json')))
end

FactoryGirl.define do
  factory :key do
  end

  factory :layer do
    sequence(:description) { |n| "layer #{n}" }
    layout
  end

  factory :layout do
    sequence(:name) { |n| "keyboard #{n}" }
    factory :ergodox_ez_layout do
      keyboard Keyboard.ergodox_ez
      after(:create) do |layout|
        layout.update!(Layout.remap_json(ergodox_ez_hash))
      end
    end
  end

  factory :keyboard do
    sequence(:name) { |n| "keyboard #{n}" }
    key_count 104
  end
end
