require 'rails_helper'

feature 'a citizen report a new problem', %Q{
  As an authenticated citizen
  I want to report a new problem
  So that the government can get to fixing it quicker
} do

  # Acceptance Criteria
  # [ ] - I want to simply click the type of problem in a radio box
  # [ ] - I want to be geotagged where I am!

  user = FactoryGirl.create(:user)

  sign_in(user)
  expect(page).to have_content('Signed in successfully')

  visit "/"

  choose('Bache')

  expect(page).to have_content("Problema Notado")s

end
