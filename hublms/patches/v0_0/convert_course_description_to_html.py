import frappe
from hublms.hublms.md import markdown_to_html


def execute():
	courses = frappe.get_all("Hublms Course", fields=["name", "description"])

	for course in courses:
		html = markdown_to_html(course.description)
		frappe.db.set_value("Hublms Course", course.name, "description", html)

	frappe.reload_doc("lms", "doctype", "lms_course")
