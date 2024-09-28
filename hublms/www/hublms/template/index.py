import frappe
from frappe import _
import click

def get_context(context):
    # HTML, CSS = import_weasyprint()
    # pdf = HTML('https://weasyprint.org/').write_pdf()
    # name = "test"

    # frappe.local.response.filename = "{name}.pdf".format(
    #     name=name.replace(" ", "-").replace("/", "-")
    # )
    # frappe.local.response.filecontent = pdf
    # frappe.local.response.type = "pdf"
    
    template_id = frappe.form_dict.get("template")
    
    template = frappe.db.get_value('Hublms Certificate Template', template_id, '*')
    template_items = frappe.db.get_all('Hublms Certificate Template Item',
    filters={
        'parent': template_id
    },
    fields=['text', 'image','position_x','position_y','font_size','font_color'],
    )
    
    print("xxxxxxxxx");
    print(template);
    print("xxxxxxxxx");
    
    context.title = template.title
    context.orientation = template.orientation
    context.background_image = template.background_image
    context.items = template_items
