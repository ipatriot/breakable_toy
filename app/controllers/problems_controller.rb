class ProblemsController < ApplicationController

  def index
    @problems = Problem.all
  end

  def show
    @problem = Problem.find(params[:id])

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
      respond_to do |format|
        format.html do
          flash[:notice] = "problem successfully posted!"
          redirect_to edit_problem_path(@problem)
        end
        format.json { render json: @problem }
      end
    else
      format.html do
        flash[:notice] = "Please submit the field correctly!"
        redirect_to :back
      end
      format.json { render status: 500 }
    end
  end

  def edit
    @problem = Problem.find(params[:id])

    respond_to do |format|
      format.html
      format.json { render json: @problem }
    end

    @problem = Problem.find(params[:id])
  end

  def update

    @problem = Problem.find(params[:id])

    if @problem.update_attributes(problem_params)
      flash[:notice] = "You have successfully edited this question!"
      redirect_to problem_path(@problem)
    else
      flash[:notice] = "Please fill out the field correctly!"
      redirect_to :back
    end
  end


  private

  def problem_params
      params.require(:problem).permit(:name, :latitude, :longitude, :address)
  end

end
