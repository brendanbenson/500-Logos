require 'digest/md5'

class LogosController < ApplicationController
  
  before_filter :authenticate_user!, :except => :play
  
  # GET /logos
  def index
    respond_to do |format|
      format.html { @logos = Logo.all }
    end
  end

  # GET /logos/play
  def play
    respond_to do |format|
      format.json { render :json => Logo.all(:limit => 12, :order => 'random()') }
    end
  end

  # GET /logos/1
  def show
    @logo = Logo.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
    end
  end

  # GET /logos/new
  def new
    @logo = Logo.new

    respond_to do |format|
      format.html # new.html.erb
    end
  end

  # GET /logos/1/edit
  def edit
    @logo = Logo.find(params[:id])
  end

  # POST /logos
  def create
    @logo = Logo.new(params[:logo])

    respond_to do |format|
      if @logo.save
        format.html { redirect_to(@logo, :notice => 'Logo was successfully created.') }
      else
        format.html { render :action => "new" }
      end
    end
  end

  # PUT /logos/1
  def update
    @logo = Logo.find(params[:id])

    respond_to do |format|
      if @logo.update_attributes(params[:logo])
        format.html { redirect_to(@logo, :notice => 'Logo was successfully updated.') }
      else
        format.html { render :action => "edit" }
      end
    end
  end

  # DELETE /logos/1
  def destroy
    @logo = Logo.find(params[:id])
    @logo.destroy

    respond_to do |format|
      format.html { redirect_to(logos_url) }
    end
  end
end
