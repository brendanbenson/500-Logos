class CreateLogos < ActiveRecord::Migration
  def self.up
    create_table :logos do |t|
      t.string :urlsmall
      t.string :urllarge
      t.string :correct
      t.string :choice1
      t.string :choice2
      t.string :choice3

      t.timestamps
    end
  end

  def self.down
    drop_table :logos
  end
end
