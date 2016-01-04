Rails.application.routes.draw do
  root 'keyboard_layouts#index'
  resources :keyboard_layouts do
    get 'download', on: :member
  end
end
