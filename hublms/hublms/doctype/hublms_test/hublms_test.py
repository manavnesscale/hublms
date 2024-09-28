# Copyright (c) 2024, Hublms and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class HublmsTest(Document):
	pass

def upload_assignment(
	assignment_attachment=None,
	answer=None,
	assignment=None,
	lesson=None,
	status="Not Graded",
	comments=None,
	submission=None,
):
	if frappe.session.user == "Guest":
		return

	assignment_details = frappe.db.get_value(
		"Hublms Test", assignment, ["type", "grade_assignment"], as_dict=1
	)
	assignment_type = assignment_details.type

	if assignment_type in ["URL", "Text"] and not answer:
		frappe.throw(_("Please enter the URL for assignment submission."))

	if assignment_type == "File" and not assignment_attachment:
		frappe.throw(_("Please upload the assignment file."))

	if assignment_type == "URL" and not validate_url(answer):
		frappe.throw(_("Please enter a valid URL."))

	if submission:
		doc = frappe.get_doc("LMS Assignment Submission", submission)
	else:
		doc = frappe.get_doc(
			{
				"doctype": "LMS Assignment Submission",
				"assignment": assignment,
				"lesson": lesson,
				"member": frappe.session.user,
				"type": assignment_type,
			}
		)

	doc.update(
		{
			"assignment_attachment": assignment_attachment,
			"status": "Not Applicable"
			if assignment_type == "Text" and not assignment_details.grade_assignment
			else status,
			"comments": comments,
			"answer": answer,
		}
	)
	doc.save(ignore_permissions=True)
	return doc.name