require 'spec_helper'

RSpec.describe KeyboardLayoutsController, type: :controller do
  let(:subject) { FactoryGirl.create(:layout) }

  let(:valid_attributes) do
    {
      'layout' => {
        'kind' => 'ergodox_ez',
        'description' => 'Untitled',
        'properties' => {},
        'layers' => [
          {
            'description' => 'Cool layer',
            'properties' => {},
            'keys' => [
              {
                'code' => 'KC_D',
                'label' => 'D',
                'position' => 23
              }
            ]
          }
        ]
      }
    }
  end

  # let(:invalid_attributes) { }

  before do
    expect(Keyboard.ergodox_ez).to be_present
  end

  describe 'index' do
    it 'redirects to new' do
      get :index
      expect(response).to redirect_to new_keyboard_layout_url
    end
  end

  describe 'edit' do
    it 'can edit a layout' do
      get :edit, id: subject.id
      expect(response.code).to eq('200')
      expect(response).to render_template :edit
    end
  end

  describe 'show' do
    it 'redirects to edit' do
      get :show, id: subject.id
      expect(response).to redirect_to edit_keyboard_layout_url(subject)
    end
  end

  describe 'new' do
    it 'can view new' do
      get :new
      expect(response.code).to eq('200')
      expect(response).to render_template :new
    end
  end

  describe 'create' do
    it 'creates a given layout with the attributes we require' do
      expect do
        post :create, valid_attributes
      end.to change(Layout, :count).by(1)

      layout = Layout.last
      expect(layout.description).to eq('Untitled')
      expect(layout.kind).to eq('ErgoDox EZ')
      expect(layout.layers.count).to eq 1
      expect(layout.layers.first.keys.count).to eq 1
      layer = layout.layers.first
      expect(layer.description).to eq 'Cool layer'
      key = layer.keys.first
      expect(key.code).to eq('KC_D')
      expect(key.label).to eq('D')
      expect(key.position).to eq(23)
    end

    it 'returns the JSON we want' do
      post :create, valid_attributes
      layout = Layout.last
      result = JSON.parse response.body
      target_json = valid_attributes
      target_json['layout'].merge!('id' => layout.id)

      expect(result.with_indifferent_access).to eq(target_json)
    end
  end

  describe 'update' do
    it 'updates and maintains the same number of keys and layers'
  end
end
