class ScoreValidator < ActiveModel::Validator
  include ApplicationHelper
  def validate(record)
    record.errors[:base] << "Invalid score" unless record.mdd == md5(record.score)
  end
end

class Score < ActiveRecord::Base
  validates_with ScoreValidator
end

