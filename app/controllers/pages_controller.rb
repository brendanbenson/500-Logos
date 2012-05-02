class PagesController < ApplicationController
  
  def home
    @title = 'Logo Quiz Game!'
  end

  def contact
    @title = 'Contact'
  end
  
  def about
    @title = 'About'
  end
  
  def help
    @title = 'Help'
  end

end
