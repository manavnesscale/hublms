import frappe
from frappe.model.rename_doc import rename_doc


def execute():
	if frappe.db.exists("DocType", "Hublms Assignment Submission"):
		return

	frappe.flags.ignore_route_conflict_validation = True
	rename_doc("DocType", "Lesson Assignment", "Hublms Assignment Submission")
	frappe.flags.ignore_route_conflict_validation = False

	frappe.reload_doctype("Hublms Assignment Submission", force=True)
