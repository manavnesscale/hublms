frappe.ready(() => {
	const self = this;
	this.quiz_submitted = false;
	this.answer = [];
	this.is_correct = [];
	this.show_answers = $("#quiz-title").data("show-answers");
	localStorage.removeItem($("#quiz-title").data("name"));
	
    parse_options();
	
	$(".btn-start-hublms-quiz").click((e) => {
		$("#start-banner").addClass("hide");
		$("#quiz-form").removeClass("hide");
		mark_active_question();
	});

	$(".option").click((e) => {
		if (!$("#check").hasClass("hide")) enable_check(e);
	});

	$(".possibility").keyup((e) => {
		enable_check(e);
	});

	$("#summary").click((e) => {
		e.preventDefault();
		if (!this.show_answers) check_answer();

		setTimeout(() => {
			quiz_summary(e);
		}, 500);
	});

	$("#check").click((e) => {
		e.preventDefault();
		check_answer(e);
	});

	$("#next").click((e) => {
		e.preventDefault();
		if (!this.show_answers) check_answer();

		mark_active_question(e);
	});

	$("#try-again").click((e) => {
		try_quiz_again(e);
	});

	$(".btn-show-results").click((e) => {
		show_results_modal(e);
	});
});

const mark_active_question = (e = undefined) => {
	let total_questions = $(".question").length;
	let current_index = $(".active-question").attr("data-qt-index") || 0;
	let next_index = parseInt(current_index) + 1;

	if (this.show_answers) {
		$("#next").addClass("hide");
	} else if (!this.show_answers && next_index == total_questions) {
		$("#next").addClass("hide");
		$("#summary").removeClass("hide");
	}

	$(".question").addClass("hide").removeClass("active-question");
	$(`.question[data-qt-index='${next_index}']`)
		.removeClass("hide")
		.addClass("active-question");

	$(".current-question").text(`${next_index}`);
	$("#check").removeClass("hide").attr("disabled", true);
	$("#next").attr("disabled", true);
	$(".explanation").addClass("hide");

	$(".timer").addClass("hide");
	calculate_and_display_time(100);
	$(".timer").removeClass("hide");
	initialize_timer();
};

const calculate_and_display_time = (percent_time) => {
	$(".timer .progress-bar").attr("aria-valuenow", percent_time);
	$(".timer .progress-bar").attr("aria-valuemax", percent_time);
	$(".timer .progress-bar").css("width", `${percent_time}%`);
	let progress_color = percent_time < 20 ? "red" : "var(--primary-color)";
	$(".timer .progress-bar").css("background-color", progress_color);
};

const initialize_timer = () => {
	this.time_left = $(".timer").data("time");
	calculate_and_display_time(100, this.time_left);
	$(".timer").removeClass("hide");
	const total_time = $(".timer").data("time");
	this.start_time = new Date().getTime();
	const self = this;
	let old_diff;

	this.timer = setInterval(function () {
		var diff = (new Date().getTime() - self.start_time) / 1000;
		var variation = old_diff ? diff - old_diff : diff;
		old_diff = diff;
		self.time_left -= variation;
		let percent_time = (self.time_left / total_time) * 100;
		calculate_and_display_time(percent_time);
		if (self.time_left <= 0) {
			clearInterval(self.timer);
			$(".timer").addClass("hide");
			check_answer();
			$("#next").attr("disabled", false);
		}
	}, 100);
};

const enable_check = (e) => {
	if ($(".option:checked").length || $(".possibility").val().trim()) {
		$("#check").removeAttr("disabled");
		$("#next").removeAttr("disabled");
		$(".custom-checkbox").removeClass("active-option");
		$(".option:checked")
			.closest(".custom-checkbox")
			.addClass("active-option");
	}
};



const try_quiz_again = (e) => {
	e.preventDefault();
	if (window.location.href.includes("new-submission")) {
		const target = $(e.currentTarget);
		window.location.href = `/quiz-submission/
		${target.data("quiz")}/
		${target.data("submission")}`;
	} else {
		window.location.reload();
	}
};

const check_answer = (e = undefined) => {
	e && e.preventDefault();
	let answer = $(".active-question textarea");
	let total_questions = $(".question").length;
	let current_index = $(".active-question").attr("data-qt-index");

	if (answer.length && !answer.val().trim()) {
		frappe.throw(__("Please enter your answer"));
	}

	clearInterval(self.timer);
	$(".timer").addClass("hide");

	$(".explanation").removeClass("hide");
	$("#check").addClass("hide");

	if (current_index == total_questions) {
		$("#summary").removeClass("hide");
	} else if (this.show_answers) {
		$("#next").removeClass("hide");
	}
	parse_options();
};

const parse_options = () => {
	
    $(".active-question").each((i, question) => {
        let element;
        let type = $(question).data("type");
        let is_answer_correct =  $(question).data("is_correct");

        if (type == "Choices") {
            element = $(question).find('input');
            parse_choices(element, is_answer_correct);

        } else {
            element = $(question).find('textarea');
			parse_possible_answers(element, is_answer_correct);

        }
    });

};

const parse_choices = (element, is_correct) => {
	element.each((i, elem) => {
		// if ($(elem).prop("checked")) {

		// 	if (this.show_answers)
		// 		is_correct
		// 			? add_icon(elem, "check")
		// 			: add_icon(elem, "wrong");
		// } else {
		// 	add_icon(elem, "minus-circle");
		// }
	});
};

const parse_possible_answers = (element, correct) => {
	self.answer.push(decodeURIComponent($(element).val()));
	self.is_correct.push(correct);
	if (this.show_answers)
		correct
			? show_indicator("success", element)
			: show_indicator("failure", element);
};

const show_indicator = (class_name, element) => {
	let label = class_name == "success" ? "Correct" : "Incorrect";
	let icon =
		class_name == "success" ? "#icon-solid-success" : "#icon-solid-error";
	$(`<div class="answer-indicator ${class_name}">
			<svg class="icon icon-md">
				<use href=${icon}>
			</svg>
			<span style="font-weight: 500">${__(label)}</span>
		</div>`).insertAfter(element);
};

const add_icon = (element, icon) => {
	$(element).closest(".custom-checkbox").removeClass("active-option");
	$(element).closest(".option").addClass("hide");
	let label = $(element).siblings(".option-text").text();
	$(element).siblings(".option-text").html(`
        <div>
            <img class="d-inline mr-3" src="/assets/hublms/icons/${icon}.svg">
            ${label}
        </div>
    `);
};


