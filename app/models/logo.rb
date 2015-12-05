require 'csv'

class Logo < ActiveRecord::Base
  def self.import(filename)
    CSV.foreach(filename, headers: true) do |line|
      Logo.create!(line.to_hash)
    end
  end
end
