# Copyright (c) 2023, Hublms and contributors
# For license information, please see license.txt

import frappe
import logging
from frappe.model.document import Document
from frappe.utils import add_years, nowdate
from frappe.utils import get_url
from urllib.parse import quote
from datetime import datetime

class HublmsCertificate(Document):
	pass

@frappe.whitelist()
def verfiy_certificate(code):
	valid = frappe.db.exists(
		"Hublms Certificate", {"name": code}
	)
	if not valid:
		return 0
	# logging.warning('Watch out!')  
 
	# print("--------------")
	# print(code)
	# print("--------------")
 
	return 1
@frappe.whitelist()
def create_certificate(course):
	
	

     
	enable_certification = (frappe.db.get_value("Hublms Course", course, "enable_certification"))
	if not enable_certification:
		return
	expires_after_yrs 	 = int(frappe.db.get_value("Hublms Course", course, "expiry"))
	certificate_template 	 = frappe.db.get_value("Hublms Course", course, "certificate_template");
	
	certificate = frappe.get_all(
		"Hublms Certificate",
		filters={"member_name": frappe.session.user,"course": course,"template": certificate_template},
		order_by="idx",
	)

	if certificate:
		return certificate

	expiry_date = None
	if expires_after_yrs:
		expiry_date = add_years(nowdate(), expires_after_yrs)

	

	certificate = frappe.get_doc(
		{
			"doctype": "Hublms Certificate",
			"member_name": frappe.session.user,
			"course": course,
			"issue_date": nowdate(),
			"expiry_date": expiry_date,
			"template": certificate_template,
		}
	)
	certificate.save(ignore_permissions=True)

	return certificate
@frappe.whitelist()
def create_quiz_certificate(quiz,course):
	enable_certification = (frappe.db.get_value("Hublms Quiz", quiz, "enable_certification"))
	if not enable_certification:
			return
	expires_after_yrs 	 	= int(frappe.db.get_value("Hublms Quiz", quiz, "expiry"))
	certificate_template 	= frappe.db.get_value("Hublms Quiz", quiz, "certificate_template");
	
	certificate = frappe.get_all(
		"Hublms Certificate",
		filters={"member_name": frappe.session.user,"course": course,"template": certificate_template},
		order_by="idx",
	)

	if certificate:
		return certificate

	expiry_date = None
	if expires_after_yrs:
		expiry_date = add_years(nowdate(), expires_after_yrs)

	

	certificate = frappe.get_doc(
		{
			"doctype": "Hublms Certificate",
			"member_name": frappe.session.user,
			"course": course,
			"issue_date": nowdate(),
			"expiry_date": expiry_date,
			"template": certificate_template,
		}
	)
	certificate.save(ignore_permissions=True)

	return certificate


@frappe.whitelist()
def download_pdf(name,template_id):
	HTML, CSS = import_weasyprint()
	certificate = frappe.db.get_value('Hublms Certificate', name, '*')
	template = frappe.get_doc('Hublms Certificate Template', template_id)
	template_items = frappe.get_all('Hublms Certificate Template Item',
		filters={
			'parent': template_id
		},
		fields=['text', 'image', 'position_x', 'position_y', 'font_size', 'font_color'],
	)

	orientation = template.orientation
	member = certificate.member_name
	date = certificate.creation.strftime("%m/%d/%Y, %H:%M:%S")
	course = certificate.course
	code = certificate.name
	
	background_image = get_url(quote( template.background_image))
	items = template_items
	css_code = (
    '''
    @page { size: A4 '''+orientation+'''; margin: 1cm }

    .certificate-content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('{background_image}');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        font-family: Arial, sans-serif;
        border: 4px double #000;
        box-sizing: border-box;
    }

    .text-container {
        position: absolute;
        box-sizing: border-box;
    }
    '''
).replace('{background_image}', background_image)
	html_code = (
		'<!DOCTYPE html>\n'
		'<html>\n'
		'<head>\n'
		'    <meta charset="utf-8">\n'
		'    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n'
		'    <meta name="generator" content="frappe">\n\n'
		'</head>\n\n'
		'<body>\n'
		'    <div class="certificate-content">\n'
		'        <!-- Loop through items and dynamically generate HTML -->\n'
	)

	for item in items:
		html_code += (
			'        <div class="text-container" style="left: ' + str(item['position_x']) +
			'px; top: ' + str(item['position_y']) +
			'px; font-size: ' + str(item['font_size']) +
			'px; color: ' + item['font_color'] +
			'; padding: 10px;">\n'
		)

		if item['image']:
			html_code += (
				'            <img src="' + get_url(quote(item['image'])) + '" style="width: 50px; height: auto;">\n'
			)

		if item['text']:
			html_code += (
				'            ' + item['text'] + '\n'
			)

		html_code += '        </div>\n'

	html_code += (
		'    </div>\n\n'
		'</body>\n'
		'</html>\n'
	)
	html_code = html_code.replace('{student}', member).replace('{date}', date).replace('{course}', course).replace('{code}', code)
	css = CSS(string=css_code)
	html = HTML(string=html_code,base_url='http://lms.test:8010/').write_pdf(stylesheets=[css])
	
	name = "test"

	frappe.local.response.filename = "{name}.pdf".format(
		name=name.replace(" ", "-").replace("/", "-")
	)
	frappe.local.response.filecontent = html
	frappe.local.response.type = "pdf"
    

@frappe.whitelist()
def import_weasyprint():
	try:
		from weasyprint import CSS, HTML

		return HTML, CSS
	except OSError:
		message = "\n".join(
			[
				"WeasyPrint depdends on additional system dependencies.",
				"Follow instructions specific to your operating system:",
				"https://doc.courtbouillon.org/weasyprint/stable/first_steps.html",
			]
		)
		click.secho(message, fg="yellow")
		frappe.throw(message)



