class PagesController < ApplicationController
  
  def home
    @title = 'Logo Quiz Game!'
    @description = 'Test your knowledge of corporate logos in this fast-paced logo quiz! How well do you know brands like Nike, Pepsi, and CNN?'
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
