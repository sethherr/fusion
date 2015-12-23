require 'spec_helper'

RSpec.describe KeyboardLayoutsController, type: :controller do
  let(:subject) { FactoryGirl.create(:layout) }

  let(:valid_attributes) do
    {
      'layout': {
        'kind': 'ergodox_ez',
        'description': 'Untitled',
        'properties': {},
        'layers': [
          {
            'description': 'Cool layer',
            'properties': {},
            'keys': [
              {
                'code': 'KC_D',
                'label': 'D',
                'position': 23
              }
            ]
          }
        ]
      }
    }
  end

  let(:invalid_attributes) { }

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
      expect(response).to redirect_to edit_keyboard_layout_url(layout)
    end
  end

  describe 'new' do
    it 'can view new' do
      get :new
      expect(response.code).to eq('200')
      expect(response).to render_template :new
    end
  end

  describe 'update' do
    it 'updates a given layout' do
      post :create, valid_attributes
      result = JSON.parse response.body
      pp result
      fail
    end
  end
end
