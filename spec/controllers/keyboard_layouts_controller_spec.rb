require 'spec_helper'

RSpec.describe KeyboardLayoutsController, type: :controller do
  let(:keyboard) { FactoryGirl.create(:keyboard) }

  let(:valid_attributes) { }

  let(:invalid_attributes) { }

  describe 'index' do
    it 'can view the index' do
      get :index
      expect(response.code).to eq('200')
      expect(response).to render_template :index
    end
  end

  describe 'edit' do
    it 'can edit a survey' do
      get :edit, id: survey.id
      expect(response.code).to eq('200')
      expect(response).to render_template :edit
    end
  end

  describe 'show' do
    it 'can view a survey' do
      get :show, id: survey.id
      expect(response.code).to eq('200')
      expect(response).to render_template :show
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

