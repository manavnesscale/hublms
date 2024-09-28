import frappe


def execute():
	if (
		frappe.db.count("Hublms Course")
		and frappe.db.count("Course Chapter")
		and frappe.db.count("Course Lesson")
		and frappe.db.count("Hublms Quiz")
	):
		frappe.db.set_value("Hublms Settings", None, "is_onboarding_complete", True)
