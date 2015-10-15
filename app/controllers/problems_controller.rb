class ProblemsController < ApplicationController
    # before_action :require_login

    before_action :authenticate_user!, except: [:show, :edit, :create, :new, :update]
  def index
    @problems_to_complete = Problem.where(complete = false)

    @problems_completed = Problem.where(complete = true)

    respond_to do |format|
      format.html
      format.json { render json: @problems_to_complete }
    end
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
    if @problem.edit_status == false


      respond_to do |format|
        format.html
        format.json { render json: @problem }
      end

      @problem = Problem.find(params[:id])
    else
      flash[:notice] = "This problem has already been reported"
      redirect_to problem_path(@problem)
    end
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
      params.require(:problem).permit(:name, :latitude, :longitude, :address, :edit_status)
  end

end
