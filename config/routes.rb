Rails.application.routes.draw do
  root 'keyboard_layouts#new'
  resources :keyboard_layouts
end
