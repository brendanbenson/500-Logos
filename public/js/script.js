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
		
		mdd: null,
		
		load: function(url) {
			this.questions = null;
			this.question = null;
			this.cur = null;
			this.timer = 0;
			this.score = 0;
			this.interval = null;
			this.mdd = null;
			this.updatescore();
			$.getJSON(url, null, this.loadsuccess)
		},
		
		loadsuccess: function(data, status, jqxhr) {
			QUIZ.questions = data;
			QUIZ.question = data[0].logo;
			QUIZ.buildquestion();
		},
		
		buildquestion: function() {
			var choices = new Array(this.question.choice1, this.question.choice2, this.question.choice3, this.question.correct);						
			
			shuffle = function(o){ //v1.0
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
			$("p").click(function() {
				//Determine if the user has chosen the correct logo
				QUIZ.check($(this).html());
			});
		},
		
		check: function(choice) {
			var correct = choice == this.question.correct;
			//alert(correct);
			if (correct) {
				window.clearInterval(this.interval);
				this.updatescore();
				this.cur++;
				try {
					this.question = this.questions[this.cur].logo;
					this.buildquestion();
				}
				catch (err) {
					//No remaining logos - end the quiz
					this.endquiz();
				}
			} else {
				alert("Incorrect!");
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
				$('#logo').addClass('loading');
				$('#logo').show();			
				var large = new Image();
				$(large)
					.load(function() {
						$('#logo').removeClass('loading');
						$('#logo').hide();
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
			$('#logo').html('');
			$('#choices').html('');
			this.mdd = hex_md5(this.score + sqts);
			this.sendscore();
		},
		
		sendscore: function() {
			var score = {
				score: {
					name: "Brendan",
					score: this.score,
					mdd: this.mdd
				}
			};
			//$.getJSON("scores.json", score, this.sendsuccess)
			jQuery.post("scores.json", score, QUIZ.sendsuccess, "json");
		},
		
		sendsuccess: function(data, status, jqxhr) {
			$('#start').fadeIn();
		}
	};
	
	//QUIZ.load("logos.json");
	
	$('#start').click(function() {
		$('#start').fadeOut();
		QUIZ.load("logos.json");
	});
});
















