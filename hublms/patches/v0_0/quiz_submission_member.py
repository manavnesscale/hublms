import frappe


def execute():
	frappe.reload_doc("lms", "doctype", "lms_quiz_submission")
	submissions = frappe.db.get_all("Hublms Quiz Submission", fields=["name", "owner"])

	for submission in submissions:
		frappe.db.set_value(
			"Hublms Quiz Submission", submission.name, "member", submission.owner
		)
