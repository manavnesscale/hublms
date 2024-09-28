import frappe


def execute():
	frappe.reload_doc("lms", "doctype", "lms_course")
	courses = frappe.get_all(
		"Hublms Course", {"status": ("is", "not set")}, ["name", "published"]
	)
	for course in courses:
		status = "Approved" if course.published else "In Progress"
		frappe.db.set_value("Hublms Course", course.name, "status", status)
