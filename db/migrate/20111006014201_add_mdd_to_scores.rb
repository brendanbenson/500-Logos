class AddMddToScores < ActiveRecord::Migration
  def self.up
    add_column :scores, :mdd, :string
  end

  def self.down
    remove_column :scores, :mdd
  end
end
