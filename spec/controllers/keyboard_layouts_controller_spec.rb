require 'spec_helper'

RSpec.describe KeyboardLayoutsController, type: :controller do
  include_context :keyboard_json_fixtures
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

  describe 'download' do
    it 'successfully creates an ergodox_ez' do
      layout = FactoryGirl.create(:ergodox_ez_layout)
      get :download, id: layout.id
      expect(response.code).to eq('200')
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

    it 'creates a given layout from all the valid keys' do
      ergodox_ez_attrs = { layout: JSON.parse(ergodox_ez_json) }
      post :create, ergodox_ez_attrs.as_json, format: :json
      layout = Layout.last
      expect(layout.keys.count).to be > 75
    end
  end

  describe 'update' do
    it 'updates' do
      expect(subject.present?).to be_truthy
      expect do
        put :update, id: subject.id, layout: valid_attributes['layout']
      end.to change(Layout, :count).by(0)

      subject.reload
      expect(subject.description).to eq('Untitled')
      expect(subject.kind).to eq('ErgoDox EZ')
      expect(subject.layers.count).to eq 1
      expect(subject.layers.first.keys.count).to eq 1
      layer = subject.layers.first
      expect(layer.description).to eq 'Cool layer'
      key = layer.keys.first
      expect(key.code).to eq('KC_D')
      expect(key.label).to eq('D')
      expect(key.position).to eq(23)
    end

    it 'maintains the same number of ;ayers' do
      FactoryGirl.create(:layer, layout: subject)
      expect(subject.layers.count).to eq 1
      put :update, id: subject.id, layout: valid_attributes['layout']
      subject.reload
      expect(subject.layers.count).to eq 1
    end
  end
end
