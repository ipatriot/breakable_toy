class ProblemsController < ApplicationController

  def index
    @problems = Problem.all
  end

  def show
    @problem = Problem.find(params[:id])
    # render json: @problem

    respond_to do |format|
      format.html
      format.json { render json: @problem }
    end
  end

  def new
    @problem = Problem.new
  end

  def create
    @problem = Problem.new(problem_params)

    if @problem.save
      flash[:notice] = "problem successfully posted!"
      redirect_to '/'
    else
      flash[:notice] = "Please submit the field correctly!"
      redirect_to :back
    end
  end


  private

  def problem_params
      params.require(:problem).permit(:name, :latitude, :longitude)
  end

end
