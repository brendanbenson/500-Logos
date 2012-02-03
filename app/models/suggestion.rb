class Suggestion < ActiveRecord::Base
  validates :email, :name, :logo, :image, :presence => true
end
