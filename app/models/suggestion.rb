class Suggestion < ActiveRecord::Base
  validates :email, :name, :logo, :presence => true
end
