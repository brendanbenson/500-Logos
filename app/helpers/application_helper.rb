require 'digest'

module ApplicationHelper  
  # Return the salted md5
  def md5(pass)
    Digest::MD5.hexdigest("#{pass}cae0c58f1ced14aca135f63739ed1317")
  end
  
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
