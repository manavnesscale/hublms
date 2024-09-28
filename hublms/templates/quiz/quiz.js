frappe.ready(() => {
	const self = this;
	this.quiz_submitted = false;
	this.answer = [];
	this.is_correct = [];
	this.show_answers = $("#quiz-title").data("show-answers");
	localStorage.removeItem($("#quiz-title").data("name"));

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
		// Scroll the entire window to the top
	});

	$("#next").click((e) => {
		e.preventDefault();
		
		if (!this.show_answers) check_answer();

		mark_active_question(e);
		var objDiv = document.getElementById("quiz-form");
		window.scrollTo(0, objDiv.getBoundingClientRect().top + window.pageYOffset); 
	});

	$("#try-again").click((e) => {
		try_quiz_again(e);
	});

	$(".btn-show-results").click((e) => {
		show_results_modal(e);
	});
	
        
	document.body.addEventListener('click', function(event) {
		if (event.target.id === 'downloadPdf') {
			var html = document.querySelector('.modal-content');

			var originalBody = document.body.innerHTML; // save the current body
            document.body.innerHTML = `<div class="empty-state group-by-loading">
			"Loading..."
			</div>`; // clear the body

            setTimeout(function() {
                html2pdf(html, {
                    margin: 1,
                    filename: 'myfile.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                }).then(function() {
					location.reload()
                    document.body.innerHTML = originalBody; // put the original body back
                });
            }, 3000); // delay of 3 seconds
			// html2pdf(element);
		}
	});   
	
});
const create_quiz_certificate = () => {

	quiz = $("#quiz-title").attr("data-name");
	course = $("#title").attr("data-course");
	frappe.call({
		method: "hublms.hublms.doctype.hublms_certificate.hublms_certificate.create_quiz_certificate",
		args: {
			quiz: quiz,
			course: course,
		},
		callback: (data) => {
            // console.log(data);
			// window.location.href = `/courses/${course}/${data.message.name}`;
		},
	});
};
const parse_modal_options = () => {
	setTimeout(function() {
		$(".active-question").each((i, question) => {

			let element;
			let type = $(question).data("type");
			let is_answer_correct =  $(question).data("is_correct");

			if (type == "Choices") {
				element = $(question).find('input');
				parse_modal_choices(element, is_answer_correct);

			} else {
				element = $(question).find('textarea');
				parse_possible_answers(element, is_answer_correct);

			}
		});
	}, 200);
};
const parse_modal_choices = (element, is_correct) => {
	element.each((i, elem) => {
		if ($(elem).prop("checked")) {

			if (this.show_answers)
				is_correct
					? add_icon(elem, "check")
					: add_icon(elem, "wrong");
		} else {
			add_icon(elem, "minus-circle");
		}
	});
};
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

const quiz_summary = (e = undefined) => {
	e && e.preventDefault();
	let quiz_name = $("#quiz-title").data("name");
	let course = $("#title").attr("data-course");

	let self = this;

	frappe.call({
		method: "hublms.hublms.doctype.hublms_quiz.hublms_quiz.quiz_summary",
		args: {
			quiz: quiz_name,
			course: course,
			results: localStorage.getItem(quiz_name),
		},
		callback: (data) => {
			$(".question").addClass("hide");
			$("#summary").addClass("hide");
			$(".quiz-footer span").addClass("hide");
			$("#quiz-form").prepend(
				`<div class="summary bold-heading text-center">
					${__("Your score is")} ${data.message.score}
					${__("out of")} ${data.message.score_out_of}
				</div>`
			);
			// $("#try-again").attr("data-submission", data.message.submission);
			// $("#try-again").removeClass("hide");
			// Compute for the overall percentage
			const overallPercentage = (data.message.score / data.message.score_out_of) * 100;
			if (overallPercentage < 75) {
				$("#try-again").attr("data-submission", data.message.submission);
				$("#try-again").removeClass("hide");
			}
			self.quiz_submitted = true;
			
			
			if (
				this.hasOwnProperty("marked_as_complete") &&
				data.message.pass
			) {
				mark_progress();
				create_quiz_certificate();
			}
		},
	});
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
	let user_answers ;
	let element;
	let type = $(".active-question").data("type");

	if (type == "Choices") {
		$(".active-question input").each((i, element) => {
			if ($(element).prop("checked")) {
				user_answers = $(element).data("id");
			}
		});
		element = $(".active-question input");
	} else {
		user_answers.push($(".active-question textarea").val());
		element = $(".active-question textarea");
	}

	is_answer_correct(type, user_answers, element);
};

const is_answer_correct = (type, user_answers, element) => {
	frappe.call({
		async: false,
		method: "hublms.hublms.doctype.hublms_quiz.hublms_quiz.check_answer",
		args: {
			question: $(".active-question").data("name"),
			type: type,
			answers: user_answers,
		},
		callback: (data) => {
			type == "Choices"
				? parse_choices(element, data.message)
				: parse_possible_answers(element, data.message);
			add_to_local_storage();
		},
	});
};

const parse_choices = (element, is_correct) => {
	element.each((i, elem) => {
		if ($(elem).prop("checked")) {
			self.answer.push(decodeURIComponent($(elem).val()));
			self.is_correct.push(is_correct);
			if (this.show_answers)
				is_correct
					? add_icon(elem, "check")
					: add_icon(elem, "wrong");
		} else {
			add_icon(elem, "minus-circle");
		}
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

const add_to_local_storage = () => {
	let current_index = $(".active-question").attr("data-qt-index");
	let quiz_name = $("#quiz-title").data("name");
	let quiz_stored = JSON.parse(localStorage.getItem(quiz_name));

	let quiz_obj = {
		question_index: current_index - 1,
		answer: self.answer.join(),
		is_correct: self.is_correct,
	};

	quiz_stored ? quiz_stored.push(quiz_obj) : (quiz_stored = [quiz_obj]);
	localStorage.setItem(quiz_name, JSON.stringify(quiz_stored));

	self.answer = [];
	self.is_correct = [];
};
const show_results_modal = (e) => {
	
	
	const target = $(e.currentTarget);

	const id = target.data("name");
	fetch('/hublms/submission/'+ id )
    .then(response => response.text())
    .then(html => {
		frappe.msgprint({
			title: 'Answers',
			message: html,
			indicator:"green",
		});
		
    })
	.then(() => parse_modal_options());

};
		
	
const show_results_modal_unused = (e) => {
	const target = $(e.currentTarget);

	const id = target.data("name");
	list = [];
	frappe.call({
		method: 'frappe.client.get',
		args: {
			fieldname: "result",
			doctype: "Hublms Quiz Submission",
			filters: {name: id}
		},
		callback: function(response) {
			var parentDoc = response.message;
			var childTableData = parentDoc.result;  // Replace with the fieldname of the child table in the parent DocType
			console.log(childTableData);
			
			html = `<div class="form-grid">
				<div class="grid-heading-row">
					<div class="grid-row">
						<div class="data-row row">
							<div class="col grid-static-col">Question.</div>
							<div class="col grid-static-col">Answer</div>
							<div class="col grid-static-col">Is Correct</div>
						</div>
					</div>
				</div>
				<div>
					<div class="grid-row">`;
						

						childTableData.forEach(function (item) {
								html += `
								<div class="data-row row">
								<div class="col " >` + item.question + `</div>
								<div class="col " >` + item.answer + `</div>
								<div class="col " >` + (item.is_correct == 1 ? "Correct" : "Wrong")   + `</div>
								</div>` ;
						});

			html += `	
					</div>
				</div>
			</div>`;

			

			frappe.msgprint({
				title: 'Answers',
				message: html
			});
		}
	});
	
	
	// let course_modal = new frappe.ui.Dialog({
	// 	title: "Quiz Result",
	// 	fields: [
	// 		{
	// 			fieldname: "questions",
	// 			fieldtype: "Table",
	// 			in_place_edit: 1,
	// 			label: __("Questions"),
	// 			fields: [
	// 				{
	// 					fieldname: "question",
	// 					fieldtype: "Link",
	// 					label: __("Question"),
	// 					options: "LMS Question",
	// 					in_list_view: 1,
	// 					only_select: 1,
	// 					reqd: 1,
	// 				},
	// 				{
	// 					fieldname: "marks",
	// 					fieldtype: "Int",
	// 					label: __("Marks"),
	// 					in_list_view: 1,
	// 					reqd: 1,
	// 				},
	// 				{
	// 					fieldname: "question_name",
	// 					fieldname: "Link",
	// 					options: "LMS Quiz Question",
	// 					label: __("Question Name"),
	// 				},
	// 			],
	// 		},
	// 		// {
	// 		// 	fieldtype: "Link",
	// 		// 	options: "Course Evaluator",
	// 		// 	label: __("Course Evaluator"),
	// 		// 	fieldname: "evaluator",
	// 		// 	only_select: 1,
	// 		// 	default: evaluator || "",
	// 		// },
	// 	],
	// 	primary_action_label: __("Close"),
	// 	primary_action(values) {
	// 		course_modal.hide();
	// 	},
	// });
	// course_modal.show();
	// setTimeout(() => {
	// 	$(".modal-body").css("min-height", "300px");
	// }, 1000);
};