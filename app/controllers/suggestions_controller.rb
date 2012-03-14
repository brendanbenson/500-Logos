class SuggestionsController < ApplicationController

  before_filter :authenticate_user!, :except => [:new, :create]

  def index
    @suggestions = Suggestion.all
  end

  def new
    @suggestion = Suggestion.new
  end

  def create
    s = Suggestion.new(params[:suggestion])

    if s.save
      flash[:success] = "Thank you for your suggestion!"
      redirect_to :root
    else
      @suggestion = s
      render :action => :new
    end
  end

  def show
    @suggestion = Suggestion.find_by_id(params[:id])
  end

end