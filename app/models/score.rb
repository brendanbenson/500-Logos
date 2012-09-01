require 'digest'

class Score < ActiveRecord::Base
  attr_accessible :score, :name, :score_hash

  validates_presence_of :score, :name, :score_hash
  validates_length_of :name, :maximum => 15
  validates_numericality_of :score

  validate :correct_hash

  def correct_hash
    errors.add(:score_hash, "is incorrect") if
        Digest::MD5.hexdigest("#{score.to_s}#{name.to_s}7oj20gakgeKHuy79@89") != score_hash
  end
end