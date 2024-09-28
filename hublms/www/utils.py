import frappe

from frappe.utils import cstr
# from hublms.hublms.utils import redirect_to_courses_list


def get_common_context(context):
	context.no_cache = 1
 
	course = frappe.db.get_value(
		"Hublms Course",
		frappe.form_dict["course"],
		["name", "title", "video_link", "enable_certification", "status"],
		as_dict=True,
	)

	context.course = course
	# membership = get_membership(course.name, frappe.session.user, batch_name)
	# context.membership = membership
	# context.progress = frappe.utils.cint(membership.progress) if membership else 0
	# context.batch_old = (
	# 	membership.batch_old if membership and membership.batch_old else None
	# )
	# context.course.query_parameter = (
	# 	"?batch=" + membership.batch_old if membership and membership.batch_old else ""
	# )
	# context.livecode_url = get_livecode_url()


def get_livecode_url():
	return frappe.db.get_single_value("Hublms Settings", "livecode_url")


def redirect_to_lesson(course, index_="1.1"):
	pass


def get_current_lesson_details(lesson_number, context, is_edit=False):
	details_list = list(filter(lambda x: cstr(x.number) == lesson_number, context.lessons))

	if not len(details_list):
		if is_edit:
			return None
		else:
			redirect_to_lesson(context.course)

	lesson_info = details_list[0]
	lesson_info.body = lesson_info.body.replace('"', "'")
	return lesson_info


def get_assessments(batch, member=None):
	if not member:
		member = frappe.session.user

	assessments = frappe.get_all(
		"Hublms Assessment",
		{"parent": batch},
		["name", "assessment_type", "assessment_name"],
	)

	for assessment in assessments:
		if assessment.assessment_type == "Hublms Assignment":
			assessment = get_assignment_details(assessment, member)

		elif assessment.assessment_type == "Hublms Quiz":
			assessment = get_quiz_details(assessment, member)

	return assessments


def get_assignment_details(assessment, member):
	assessment.title = frappe.db.get_value(
		"Hublms Assignment", assessment.assessment_name, "title"
	)

	existing_submission = frappe.db.exists(
		{
			"doctype": "Hublms Assignment Submission",
			"member": member,
			"assignment": assessment.assessment_name,
		}
	)
	assessment.completed = False
	if existing_submission:
		assessment.submission = frappe.db.get_value(
			"Hublms Assignment Submission",
			existing_submission,
			["name", "status", "comments"],
			as_dict=True,
		)
		assessment.completed = True

	assessment.edit_url = f"/assignments/{assessment.assessment_name}"
	submission_name = existing_submission if existing_submission else "new-submission"
	assessment.url = (
		f"/assignment-submission/{assessment.assessment_name}/{submission_name}"
	)

	return assessment


def get_quiz_details(assessment, member):
	assessment_details = frappe.db.get_value(
		"Hublms Quiz", assessment.assessment_name, ["title", "passing_percentage"], as_dict=1
	)
	assessment.title = assessment_details.title

	existing_submission = frappe.get_all(
		"Hublms Quiz Submission",
		{
			"member": member,
			"quiz": assessment.assessment_name,
		},
		["name", "score", "percentage"],
		order_by="percentage desc",
	)

	if len(existing_submission):
		assessment.submission = existing_submission[0]

	assessment.completed = False
	if assessment.submission:
		assessment.completed = True

	assessment.edit_url = f"/quizzes/{assessment.assessment_name}"
	submission_name = (
		existing_submission[0].name if len(existing_submission) else "new-submission"
	)
	assessment.url = f"/quiz-submission/{assessment.assessment_name}/{submission_name}"

	return assessment


def is_student(batch, member=None):
	if not member:
		member = frappe.session.user

	return frappe.db.exists(
		"Batch Student",
		{
			"student": member,
			"parent": batch,
		},
	)
