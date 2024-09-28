import frappe


def execute():
	frappe.reload_doc("lms", "doctype", "lms_course")
	courses = frappe.get_all("Hublms Course", fields=["name", "is_published"])
	for course in courses:
		frappe.db.set_value("Hublms Course", course.name, "published", course.is_published)
