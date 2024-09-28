# Copyright (c) 2023, Hublms and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils.telemetry import capture
from hublms.hublms.utils import get_course_progress
from ...md import find_macros


class HublmsTopicContent(Document):
	pass

@frappe.whitelist()
def save_progress(content,topic, course, status):
	membership = frappe.db.exists(
		"Hublms User Enrollment", {"member": frappe.session.user, "course": course}
	)
	if not membership:
		return 0
	
	content_details = frappe.db.get_value("Hublms Topic Content", {"parent":topic}, ["content","content_type"])
	macros = find_macros(content)
	quizzes = [value for name, value in macros if name == "Quiz"]
	
	for quiz in quizzes:
		passing_percentage = frappe.db.get_value("HUblms Quiz", quiz, "passing_percentage")
		if not frappe.db.exists(
			"HUblms Quiz Submission",
			{
				"quiz": quiz,
				"owner": frappe.session.user,
				"percentage": [">=", passing_percentage],
			},
		):
			return 0
	
	filters = {"content": content, "owner": frappe.session.user, "course": course}
	
	if frappe.db.exists("Hublms Course Progress", filters):
		doc = frappe.get_doc("Hublms Course Progress", filters)
		doc.status = status
		doc.save(ignore_permissions=True)
	else:
		frappe.get_doc(
			{
				"doctype": "Hublms Course Progress",
				"content": content,
				"course": course,
				"topic": topic,
				"status": status,
				"member": frappe.session.user,
			}
		).save(ignore_permissions=True)
	progress = get_course_progress(course)
	
	
	frappe.db.set_value("Hublms User Enrollment", membership, "progress", progress)
	return progress


