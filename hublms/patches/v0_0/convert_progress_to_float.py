import frappe
from frappe.utils import flt


def execute():
	frappe.reload_doc("lms", "doctype", "lms_course_progress")
	progress_records = frappe.get_all("Hublms Enrollment", fields=["name", "progress"])
	for progress in progress_records:
		frappe.db.set_value(
			"Hublms Enrollment", progress.name, "progress", flt(progress.progress)
		)
