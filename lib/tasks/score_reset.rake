desc "Reset scores"
task :score_reset => :environment do
  p Score.delete_all
end