require 'digest'

module ApplicationHelper 
  # Return a title on a per-page basis.
  def title
    base_title = "500 Logos"
    if @title.nil?
      base_title
    else
      "#{base_title} | #{@title}"
    end
  end
  
end
