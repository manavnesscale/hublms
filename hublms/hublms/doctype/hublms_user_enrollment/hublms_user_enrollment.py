# Copyright (c) 2023, Hublms and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class HublmsUserEnrollment(Document):
	pass


@frappe.whitelist()
def test(course,progress,member):
    return frappe.render_template("templates/course_outline.html", {
			"course" : course,
			"progress" : progress,
			"member" : member,
		})
@frappe.whitelist()
# def get_instructors(course):
#     instructors = frappe.get_all('Hublms Course Instructor', filters={'parent': course}, fields=['instructor'])
#     return [instructor.get('instructors') for instructor in instructors]
# def get_instructors(doctype, txt, searchfield, start, page_len, filters):
# 	course = filters.get('course')
# 	instructors = frappe.get_all('Hublms Course Instructor', filters={'parent': course}, fields=['instructor'])
# 	for instructor in instructors:
# 		user = frappe.get_all('User', filters={'email': instructor.get('instructor')}, fields=['full_name,email'])
		
# 	options = [{'value': instructor.get('instructor'), 'label': instructor.get('instructor')} for instructor in instructors]
# 	return []
def get_instructors(doctype, txt, searchfield, start, page_len, filters):
    course = filters.get('course')
    instructors = frappe.get_all('Hublms Course Instructor', filters={'parent': course}, fields=['instructor'])
    
    options = []
    
    for instructor in instructors:
        user = frappe.get_all('User', filters={'email': instructor.get('instructor')}, fields=['full_name', 'email'])
        
        # Check if user information is found
        if user:
            user_info = user[0]
            options.append({ user_info.get('full_name'), user_info.get('email') })
    
    return options