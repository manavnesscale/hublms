# Copyright (c) 2017, Frappe Technologies Pvt. Ltd. and Contributors
# License: MIT. See LICENSE
import frappe
import frappe
from frappe.utils import get_fullname

@frappe.whitelist()
def get_gradebook_config():
	gradebook_config = frappe._dict()
	gradebook_hooks = frappe.get_hooks("gradebooks")
	for hook in gradebook_hooks:
		gradebook_config.update(frappe.get_attr(hook)())

	return gradebook_config





def get_gradebooks():
	return {
		"User": {
			"fields": ["points"],
			"method": "frappe.desk.leaderboard.get_energy_point_leaderboard",
			"company_disabled": 1,
			"icon": "users",
		}
	}


@frappe.whitelist()
def get_energy_point_leaderboard(date_range, company=None, field=None, limit=None):
	all_users = frappe.get_all(
		"User",
		filters={
			"name": ["not in", ["Administrator", "Guest"]],
			"enabled": 1,
			"user_type": ["!=", "Website User"],
		},
		order_by="name ASC",
	)
	all_users_list = list(map(lambda x: x["name"], all_users))

	filters = [["type", "!=", "Review"], ["user", "in", all_users_list]]
	if date_range:
		date_range = frappe.parse_json(date_range)
		filters.append(["creation", "between", [date_range[0], date_range[1]]])
	energy_point_users = frappe.get_all(
		"Energy Point Log",
		fields=["user as name", "sum(points) as value"],
		filters=filters,
		group_by="user",
		order_by="value desc",
	)

	energy_point_users_list = list(map(lambda x: x["name"], energy_point_users))
	for user in all_users_list:
		if user not in energy_point_users_list:
			energy_point_users.append({"name": user, "value": 0})

	for user in energy_point_users:
		user_id = user["name"]
		user["name"] = get_fullname(user["name"])
		user["formatted_name"] = '<a href="/app/user-profile/{}">{}</a>'.format(
			user_id, get_fullname(user_id)
		)

	return energy_point_users
