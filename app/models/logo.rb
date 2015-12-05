require 'csv'
require 'open-uri'

class Logo < ActiveRecord::Base
  def self.import(file_url)
    CSV.new(open(file_url), headers: true).each do |line|
      Logo.create!(line.to_hash)
    end
  end
end
