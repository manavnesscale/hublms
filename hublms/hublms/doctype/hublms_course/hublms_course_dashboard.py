from frappe import _


def get_data():
	return {
		"heatmap": True,
		"heatmap_message": _(
			"This is based on transactions against this Customer. See timeline below for details"
		),
		"fieldname": "member",
		"non_standard_fieldnames": {
			"Payment Entry": "party",
			"Quotation": "party_name",
			"Opportunity": "party_name",
			"Hublms User Enrollment": "member",
			"User": "name",
		},
		"dynamic_links": {"party_name": ["Customer", "quotation_to"]},
		# "transactions": [
		# 	{"label": _("Course Progress"), "items": ["Opportunity", "Quotation"]},
		# 	{"label": _("Pre Sales"), "items": ["Hublms User Enrollment", "User"]},
			
		# ],
	}
