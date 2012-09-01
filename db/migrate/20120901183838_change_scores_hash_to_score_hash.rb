class ChangeScoresHashToScoreHash < ActiveRecord::Migration
  # SQLite3 blows up when a column is named "hash"
  def self.up
    rename_column :scores, :hash, :score_hash
  end

  def self.down
    rename_column :scores, :score_hash, :hash
  end
end
