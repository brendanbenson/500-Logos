desc "Reset scores"
task :score_reset => :environment do
  p "#{Time.current} Deleted #{Score.delete_all} scores"
end