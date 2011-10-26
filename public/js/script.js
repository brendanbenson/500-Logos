/* Author: Brendan Benson
	
TODO: Reorder the events so that the choices do not display until the image displays

*/

$(document).ready(function() {
	
	var QUIZ = {
		
		questions: null,
		
		question: null,
		
		cur: 0,
		
		timer: 20000,
		
		score: 0,
		
		interval: null,
		
		load: function(url) {
			this.questions = null;
			this.question = null;
			this.cur = 0;
			this.timer = 0;
			this.score = 0;
			this.interval = null;
			$('#logowrapper').addClass("loading");
			this.updatescore();
			$.getJSON(url, null, this.loadsuccess)
		},
		
		loadsuccess: function(data, status, jqxhr) {
			QUIZ.questions = data;
			QUIZ.question = data[0].logo;
			QUIZ.buildquestion();
		},
		
		buildquestion: function() {
			this.question = this.questions[this.cur].logo;
			var choices = new Array(this.question.choice1, this.question.choice2, this.question.choice3, this.question.correct);						
			
			shuffle = function(o){
				for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
				return o;
			};
			
			//Randomly sort the choices
			choices = shuffle(choices);
			
			//Set the choices in the UI
			$('#choices').fadeOut(300, function() {
				$('#choices').html('');
				$.each(choices, function(index, value) {
					$('#choices').append('<p class="choice">' + value + '</p>');
				});
				QUIZ.setclicker();
			});
			this.loadimages();
		},
		
		setclicker: function() {
			$(".choice").click(function() {
				//Determine if the user has chosen the correct logo
				QUIZ.check($(this));
			});
		},
		
		removeclicker: function() {
			$(".choice").unbind('click');
		},
		
		check: function(answer) {
			choice = answer.html();
			var correct = choice == this.question.correct;
			if (correct) {
				//answer.addClass("correct");
				window.clearInterval(this.interval);
				this.updatescore();
				this.removeclicker();
				this.cur++;
				$('#choices').fadeOut(300);
				$('#logo').fadeOut(300, function() {
					QUIZ.showanswer();
				});
			} else {
				answer.css("text-shadow", "1px 1px 1px #c04131");
				answer.animate({"background-color": "#d44937", "color" : "#FFFFFF"}, 1000);
				this.penalize();
			}
		},
		
		showanswer: function() {
			$('#choices').html('<p id="next">Next Question</p>');
			$('#choices').fadeIn(300);
			var correct = new Image();
			$(correct)
				.load(function() {
					$('#logo').html('');
					$('#logo').append(this);
					$('#logo').fadeIn(300);
				})
				.error(function() {
					//alert("Image load error. Please refresh the page.")
				})
				.attr('src', 'img/logos/' + QUIZ.question.urllarge)
				.attr('class', 'logoimg');
			$('#next').click(function() {
				if (QUIZ.cur < QUIZ.questions.length) {
					QUIZ.buildquestion();
				} else {
					QUIZ.endquiz();
				}
			});
		},
		
		penalize: function() {
			$("#timer").css({"color": "#d44937"});
			$('#timer').animate({"color" : "#000000"}, 2000);
			this.timer -= 5000;
			if (this.timer < 0) {
				this.timer = 0;
			}
		},
		
		updatescore: function() {
			this.score += this.timer;
			$('#score').html('Score: ' + this.score);
		},
		
		settimer: function() {
			this.timer = 20000;
			this.interval = window.setInterval(QUIZ.decrementtime, 10);
		},
		
		decrementtime: function() {
			QUIZ.timer -= Math.ceil(QUIZ.timer / 1000);
			$('#timer').html(QUIZ.timer);
		},
		
		loadimages: function() {
			$('#logo').fadeOut(300, function() {			
				var large = new Image();
				$(large)
					.load(function() {
						$('#logo').html('');
						$('#logo').append(this);
						$('#logo').fadeIn(300, function() {
							QUIZ.settimer();
						});
						$('#choices').fadeIn(300);
					})
					.error(function() {
						//alert("Image load error. Please refresh the page.")
					})
					.attr('src', 'img/logos/' + QUIZ.question.urllarge)
					.attr('class', 'logoimg');
			});
		},
		
		endquiz: function() {
			$('#logo').fadeOut(300, function() {
				$('#logo').html('');
				$('#logo').append('<div id="topscores"><p><strong>Congratulations!</strong> You scored <strong>' + QUIZ.score + '</strong> points!</p><div id="scoreform"><label>Name: <input type="text" name="user" id="scoreuser" /></label><div class="clearfix" /><p id="share" class="choice"><img src="img/facebook.png" /> <strong>Share Your Score!</strong></p></div></div>')
					.fadeIn("slow");
				$('#share').click(function() {
					var username = $('#scoreuser').val();
					if (username == '') {
						username = 'I';
					}
					var desc = username + ' just played "500 Logos" with a score of ' + QUIZ.score + '! See if you can top that!';
					FB.ui(
					  {
					    method: 'feed',
					    name: '500 Logos',
					    link: 'http://500logos.com/',
					    picture: 'http://fbrell.com/f8.jpg',
					    caption: 'Reference Documentation',
					    description: desc
					  },
					  function(response) {
					    if (response && response.post_id) {
					      //alert('Post was published.');
					    } else {
					      //alert('Post was not published.');
					    }
					  }
					);
				});
			});
			$('#choices').fadeOut(300, function() {
				var playagain = '<div id="playagain">Play Again!</div>';
				$('#choices').html('').append(playagain).fadeIn(300);
				$('#playagain').click(function() {
					QUIZ.load("logos.json");
				});
			});
			$('#logowrapper').addClass("loading");
			
			//this.mdd = hex_md5(this.score + sqts);
			//this.sendscore();
		},
		
		promptname: function() {
			
		},
	};
	
	$('#start').click(function() {
		$('#start').fadeOut();
		QUIZ.load("logos.json");
	});
});
















