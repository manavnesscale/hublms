# Copyright (c) 2023, Hublms and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document


class HublmsAssignment(Document):
	pass


@frappe.whitelist(allow_guest=True)
def get_attachments(doctype, docname):
    attachments = frappe.get_all('File', filters={'attached_to_doctype': doctype, 'attached_to_name': docname}, fields=['name', 'file_name'])
    return attachments
