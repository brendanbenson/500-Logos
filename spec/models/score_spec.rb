require 'spec_helper'

describe Score do
  describe "#correct_hash" do
    let(:score_parameters) {
        {
            :score => 545454,
            :name => "Brendan",
            :score_hash => Digest::MD5.hexdigest("545454Brendan7oj20gakgeKHuy79@89")

        }
    }

    it "should be valid with a correct hash" do
      Score.new(score_parameters).should be_valid
    end

    it "should not be valid with an incorrect hash" do
      Score.new(score_parameters.merge(:score_hash => "hgkajhg")).should_not be_valid
    end
  end
end
