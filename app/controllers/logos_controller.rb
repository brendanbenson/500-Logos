class LogosController < ApplicationController
  
  # GET /logos
  # GET /logos.xml
  def index
    @logos = Logo.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @logos }
      format.json { render :json => Logo.find(:all, :limit => 4, :order => 'random()') }
    end
  end

  # GET /logos/1
  # GET /logos/1.xml
  def show
    @logo = Logo.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @logo }
    end
  end

  # GET /logos/new
  # GET /logos/new.xml
  def new
    @logo = Logo.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @logo }
    end
  end

  # GET /logos/1/edit
  def edit
    @logo = Logo.find(params[:id])
  end

  # POST /logos
  # POST /logos.xml
  def create
    @logo = Logo.new(params[:logo])

    respond_to do |format|
      if @logo.save
        format.html { redirect_to(@logo, :notice => 'Logo was successfully created.') }
        format.xml  { render :xml => @logo, :status => :created, :location => @logo }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @logo.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /logos/1
  # PUT /logos/1.xml
  def update
    @logo = Logo.find(params[:id])

    respond_to do |format|
      if @logo.update_attributes(params[:logo])
        format.html { redirect_to(@logo, :notice => 'Logo was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @logo.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /logos/1
  # DELETE /logos/1.xml
  def destroy
    @logo = Logo.find(params[:id])
    @logo.destroy

    respond_to do |format|
      format.html { redirect_to(logos_url) }
      format.xml  { head :ok }
    end
  end
end
