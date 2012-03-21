require 'spec_helper'

describe LogosController do
  render_views

  describe "GET 'play'" do
    it "should render a list of logos" do
      get 'play', :format => :json
      response.should be_success
    end
  end
end