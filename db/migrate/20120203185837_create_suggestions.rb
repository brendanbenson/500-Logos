class CreateSuggestions < ActiveRecord::Migration
  def self.up
    create_table :suggestions do |t|
      t.string :name
      t.string :email
      t.string :logo
      t.string :image

      t.timestamps
    end
  end

  def self.down
    drop_table :suggestions
  end
end
