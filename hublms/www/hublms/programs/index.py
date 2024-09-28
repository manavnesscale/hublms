import frappe
from frappe import _
from hublms.hublms.utils import (
	check_profile_restriction,
	get_restriction_details,
	has_course_moderator_role,
	get_courses_under_review,
	get_average_rating,
	check_multicurrency,
	has_course_instructor_role,
)
from lms.overrides.user import get_enrolled_courses, get_authored_courses


def get_context(context):
	context.no_cache = 1
	context.programs = frappe.get_all(
		"Hublms Program",
		fields=[
			"program_name",
			"department",
			"hero_image"
		],
	)


