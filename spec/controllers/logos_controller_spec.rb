require 'spec_helper'
include AuthHelper

describe LogosController do
  render_views
  
  describe "application authentication" do
    it "should have basic authentication" do
      get 'index'
      response.should_not be_success
    end
    describe "for index.json" do
      it "should not require authentication" do
        get 'index', :format => :json
        response.should be_success
      end
    end
  end
    
  describe "GET 'index'" do
    before :each do
      http_login
    end
    it "should authenticate with the correct user details" do
      get 'index'
      response.should be_success
    end
  end
  
  # TODO: Create a helper method to make fake data for the show test (low importance, since show is an admin action)
  # describe "GET 'show'" do
    # before :each do
      # http_login
    # end
    # it "should be successful when authenticated" do
      # get :show, :id => 1
      # response.should be_success
    # end
  # end
end