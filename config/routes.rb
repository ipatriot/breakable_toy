Rails.application.routes.draw do
  root 'problems#new'
  devise_for :users


  resources :problems, only: [:new, :create, :index, :show, :update, :edit]
end
