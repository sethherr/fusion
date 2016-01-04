shared_context :keyboard_json_fixtures do
  let(:ergodox_ez_json) { File.read(Rails.root.join('spec/fixtures/ergodox_ez.json')) }
end
