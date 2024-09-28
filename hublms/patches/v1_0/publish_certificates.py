import frappe


def execute():
	frappe.reload_doc("lms", "doctype", "lms_certificate")
	certificates = frappe.get_all("Hublms Certificate", pluck="name")

	for certificate in certificates:
		frappe.db.set_value("Hublms Certificate", certificate, "published", 1)
