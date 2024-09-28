import frappe


def execute():
	frappe.reload_doc("lms", "doctype", "lms_batch")
	batches = frappe.get_all("Hublms Batch", pluck="name")

	for batch in batches:
		frappe.db.set_value("Hublms Batch", batch, "Published", 1)
