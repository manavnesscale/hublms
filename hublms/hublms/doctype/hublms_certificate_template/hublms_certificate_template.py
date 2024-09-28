# Copyright (c) 2023, Hublms and contributors
# For license information, please see license.txt

import frappe
from frappe import _
import click
from frappe.model.document import Document
from frappe.utils import get_url
from urllib.parse import quote

class HublmsCertificateTemplate(Document):
	pass



@frappe.whitelist()
def download_pdf(template_id):
	HTML, CSS = import_weasyprint()

	template = frappe.get_doc('Hublms Certificate Template', template_id)
	template_items = frappe.get_all('Hublms Certificate Template Item',
		filters={
			'parent': template_id
		},
		fields=['text', 'image', 'position_x', 'position_y', 'font_size', 'font_color'],
	)

	title = template.title
	orientation = template.orientation
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
	print(html_code)
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
