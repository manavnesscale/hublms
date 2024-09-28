import frappe


def execute():
	value = frappe.db.get_single_value("Hublms Settings", "portal_course_creation")
	if value == "Course Instructor Role":
		frappe.db.set_value(
			"Hublms Settings", None, "portal_course_creation", "Course Creator Role"
		)
