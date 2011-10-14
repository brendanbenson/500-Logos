class ScoresController < ApplicationController
  # GET /scores
  # GET /scores.xml
  def index
    @scores = Score.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @scores }
      format.json { render :json => Score.find(:all, :limit => 4, :order => 'score DESC')}
    end
  end
  
  def topscores
    @scores = Score.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @scores }
      format.json { render :json => Score.find(:all, :limit => 10, :order => 'score DESC')}
    end
  end

  # GET /scores/1
  # GET /scores/1.xml
  def show
    @score = Score.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @score }
    end
  end

  # GET /scores/new
  # GET /scores/new.xml
  def new
    @score = Score.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @score }
    end
  end

  # GET /scores/1/edit
  def edit
    @score = Score.find(params[:id])
  end

  # POST /scores
  # POST /scores.xml
  def create
    @score = Score.new(params[:score])

    respond_to do |format|
      if @score.save
        format.html { redirect_to(@score, :notice => 'Score was successfully created.') }
        format.xml  { render :xml => @score, :status => :created, :location => @score }
        # format.json { render :json => @score, :status => :created, :location => @score }
        #format.json { render :json => { :redirect => "scores/topscores" }  }
        format.json { render :json => Score.find(:all, :select => "name, score", :limit => 10, :order => 'score DESC') }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @score.errors, :status => :unprocessable_entity }
        format.json  { render :json => @score.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /scores/1
  # PUT /scores/1.xml
  def update
    @score = Score.find(params[:id])

    respond_to do |format|
      if @score.update_attributes(params[:score])
        format.html { redirect_to(@score, :notice => 'Score was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @score.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /scores/1
  # DELETE /scores/1.xml
  def destroy
    @score = Score.find(params[:id])
    @score.destroy

    respond_to do |format|
      format.html { redirect_to(scores_url) }
      format.xml  { head :ok }
    end
  end  
end
