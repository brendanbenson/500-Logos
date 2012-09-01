class ScoresController < ApplicationController
  def create
    @score = Score.new(params[:score])

    respond_to do |format|
      if @score.save
        format.json{ render :json => @score, :status => 200 }
      else
        format.json{ render :json => @score, :status => :unprocessable_entity }
      end
    end
  end

  def index
    @scores = Score.order(:score).limit(8)

    respond_to do |format|
      format.json{ render :json => @scores }
    end
  end
end