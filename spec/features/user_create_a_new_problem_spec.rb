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
    fill_in 'Location', with: "Cuajimalpa"

    click_button 'Create Problem'

    expect(page).to have_content("problem successfully posted!")
  end
end
