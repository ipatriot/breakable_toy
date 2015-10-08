Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users


  resources :problems, only: [:new, :create, :index, :show]
end
