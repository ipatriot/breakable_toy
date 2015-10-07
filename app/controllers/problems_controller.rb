class ProblemsController < ApplicationController

  def new
    @problem = Problem.new
  end

  def create
    # binding.pry
    @problem = Problem.new(problem_params)

    if @problem.save
      flash[:notice] = "problem successfully posted!"
      # redirect_to '/'
    else
      flash[:notice] = "Please submit the field correctly!"
      # redirect_to :back
    end

    respond_to do |format|
    format.html { redirect_to '/' }
    format.json do
      render json: { name: problem, latitude: latitude, longitude: longitude }
      binding.pry
    end
  end

  end


  private

  def problem_params
      params.require(:problem).permit(:name, :latitude, :longitude)
  end

end
