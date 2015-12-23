require 'spec_helper'

RSpec.describe KeyboardLayoutsController, type: :controller do
  let(:keyboard) { FactoryGirl.create(:keyboard) }

  let(:valid_attributes) { }

  let(:invalid_attributes) { }

  describe 'index' do
    it 'redirects to new' do
      get :index
      expect(response).to redirect_to new_keyboard_layout_url
    end
  end

  describe 'edit' do
    it 'can edit a keyboard' do
      get :edit, id: keyboard.id
      expect(response.code).to eq('200')
      expect(response).to render_template :edit
    end
  end

  describe 'show' do
    it 'can view a keyboard' do
      get :show, id: keyboard.id
      expect(response).to redirect_to edit_keyboard_layout_url(keyboard)
    end
  end

  describe 'new' do
    it 'can view new' do
      get :new
      expect(response.code).to eq('200')
      expect(response).to render_template :new
    end
  end
end
