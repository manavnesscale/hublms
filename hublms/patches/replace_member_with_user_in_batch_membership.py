import frappe


def execute():
	frappe.reload_doc("lms", "doctype", "lms_batch_membership")
	memberships = frappe.get_all("Hublms Enrollment", ["member", "name"])
	for membership in memberships:
		email = frappe.db.get_value("Community Member", membership.member, "email")
		frappe.db.set_value("Hublms Enrollment", membership.name, "member", email)
