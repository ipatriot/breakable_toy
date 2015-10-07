require 'rails_helper'

feature 'a citizen report a new problem', %Q{
  As an authenticated citizen
  I want to report a new problem
  So that the government can get to fixing it quicker
} do

  # Acceptance Criteria
  # [ ] - I want to simply click the type of problem in a radio box
  # [ ] - I want to be geotagged where I am!

  scenario 'user marks down a new problem' do
    visit new_problem_path

    find('#Baches').set(true)

    click_button 'Create Problem'

    expect(page).to have_content("problem successfully posted!")

  end

  scenario 'user does not mark a problem, but clicks submit' do
    visit new_problem_path

    fill_in 'Latitude', with: "23.54534234"
    fill_in 'Longitude', with: "134.23123213"

    click_button 'Create Problem'

    expect(page).to have_content("Please submit the field correctly!")
  end
end
