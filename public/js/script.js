/* Author: Brendan Benson
<<<<<<< HEAD

Main JS for 500logos.com.

*/

$(document).ready(function() {
	
	var QUIZ = {
		
		questions: null,
		
		question: null,
		
		cur: 0,
		
		timer: 20000,
		
		score: 0,
		
		interval: null,
		
		reftime: null,
		
		mainimage: null,
		
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
			$('#choices').html('<br /><br /><p id="next">Next Question</p>');
			$('#choices').fadeIn(300);
			this.mainimage = new Image();
			$(this.mainimage)
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
			QUIZ.reftime -= 2000;
		},
		
		updatescore: function() {
			this.score += this.timer;
			$('#score').html('Score: ' + this.formattime(this.score) + 's');
		},
		
		settimer: function() {
			this.timer = 0;
			var d = new Date();
			this.reftime = d.getTime();
			this.interval = window.setInterval(QUIZ.addtime, 10);
		},
		
		addtime: function() {
			//QUIZ.timer -= Math.ceil(QUIZ.timer / 1000);
			var d = new Date();
			QUIZ.timer = d.getTime() - QUIZ.reftime;
			$('#timer').html(QUIZ.formattime(QUIZ.timer));
		},
		
		formattime: function(t) {
			return (t / 1000).toFixed(2);
		},
		
		loadimages: function() {
			$('#logo').fadeOut(300, function() {		
				QUIZ.mainimage = new Image();
				$(QUIZ.mainimage)
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
					.attr('src', 'img/logos/' + QUIZ.question.urlsmall)
					.attr('class', 'logoimg');
			});
		},
		
		endquiz: function() {
			$('#logo').fadeOut(300, function() {
				$('#logo').html('');
				$('#logo').append('<div id="topscores"><p><strong>Congratulations!</strong> Your time was <strong>' + QUIZ.formattime(QUIZ.score) + '</strong> seconds!</p><div id="scoreform"><label>Name: <input type="text" name="user" id="scoreuser" /></label><div class="clearfix" /><p id="share" class="choice"><img src="img/facebook.png" /> <strong>Share Your Score!</strong></p></div></div>')
					.fadeIn("slow");
				$('#share').click(function() {
					var username = $('#scoreuser').val();
					if (username == '') {
						username = 'I';
					}
					var desc = username + ' just finished the "500 Logos" game with a time of ' + QUIZ.score + ' seconds! See if you can top that!';
					FB.ui(
					  {
					    method: 'feed',
					    name: '500 Logos',
					    link: 'http://500logos.com/',
					    picture: 'http://fbrell.com/f8.jpg',
					    caption: 'Test your knowledge of corporate logos!',
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
		},
	};
	
	$('#start').click(function() {
		$('#start').fadeOut();
		QUIZ.load("logos.json");
	});
});
















