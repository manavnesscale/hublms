import frappe
from frappe.model.rename_doc import rename_doc


def execute():
	if frappe.db.exists("DocType", "Hublms Enrollment"):
		return

	frappe.flags.ignore_route_conflict_validation = True
	rename_doc("DocType", "Hublms Batch Membership", "Hublms Enrollment")
	frappe.flags.ignore_route_conflict_validation = False

	frappe.reload_doctype("Hublms Enrollment", force=True)
