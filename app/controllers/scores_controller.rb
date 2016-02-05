class ScoresController < ApplicationController
  def create
    # Delete scores older than 24 hours so I don't hit the Heroku row limit
    Score.where("created_at < '#{24.hours.ago.iso8601}'").delete_all

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
    @scores = Score.where("created_at > '#{24.hours.ago.iso8601}'")
                  .order(:score)
                  .limit(8)

    respond_to do |format|
      format.json{ render :json => @scores }
    end
  end
end