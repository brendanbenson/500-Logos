require 'digest/md5'

class LogosController < ApplicationController
  
  before_filter :authenticate_user!
  
  # GET /logos
  def index
    @logos = Logo.all

    respond_to do |format|
      # Only authenticate for html format, not json format
      format.html { :authenticate_user! } # index.html.erb
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
  
  protected
  
  def authenticate
    authenticate_or_request_with_http_basic do |username, password|
       true if Digest::MD5.hexdigest(username) == "325f37b52ddf61726310df64dfc5c0ec" and Digest::MD5.hexdigest(password) == "ca0ae75110d625f6a93ba9c003f8f147"
     end
  end
  
end
