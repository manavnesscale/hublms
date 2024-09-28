import frappe
from frappe import _
# from hublms.hublms.utils import (
# 	check_profile_restriction,
# 	get_restriction_details,
# 	has_course_moderator_role,
# 	get_courses_under_review,
# 	get_average_rating,
# 	check_multicurrency,
# 	has_course_instructor_role,
# )
# from lms.overrides.user import get_enrolled_courses, get_authored_courses


def get_context(context):
	context.no_cache = 1
	context.programs = get_programs();
	context.courses = get_courses()
	context.topics = get_topics()
	context.enrolled = get_enrolled()
 


def get_programs():
	programs = frappe.get_all(
		"Hublms Program",
		fields=[
			"title",
			"department",
			"title",
			"hero_image",
			"creation",
		],
	)
	return programs

def get_courses():
	courses = frappe.get_all(
		"Hublms Course",
		fields=[
			"name",
			"upcoming",
			"title",
			"short_introduction",
			"image",
			"video_link",
			"paid_course",
			"course_price",
			"currency",
			"creation",
		],
	)

	return courses
def get_topics():
	topics = frappe.get_all(
		"Hublms Topic",
		fields=[
			"name",
			"description",
			"hero_image",
			"creation",
		],
	)

	return topics

def get_enrolled():
	logged_in_user = frappe.session.user
	enrollments = frappe.get_all(
		"Hublms User Enrollment",
		filters={
			"member": logged_in_user,
		},
		pluck='course'
		# fields=[
		# 	"course",
		# ],
	)
	print('xxxxxxxxxx')
	print(enrollments)
	print('xxxxxxxxxx')
 
	enrolled_courses = frappe.get_all(
		"Hublms Course",
		filters={
		'name': ['in', enrollments]},
		fields=[
			"name",
			"upcoming",
			"title",
			"short_introduction",
			"image",
			"video_link",
			"paid_course",
			"course_price",
			"currency",
			"creation",
		],
	)
 

	return enrolled_courses
