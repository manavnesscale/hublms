# frappe-bench/apps/myapp/myapp/www/upload.py

from __future__ import unicode_literals
import frappe
from frappe import _
from werkzeug.utils import secure_filename
import os

@frappe.whitelist(allow_guest=True)
def upload_file():
    if frappe.session.user == "Guest":
        frappe.throw(_("You need to be logged in to upload files."), frappe.AuthenticationError)

    uploaded_file = frappe.request.files.get("file")
    doctype = frappe.request.form.get("doctype")
    docname = frappe.request.form.get("docname")

    if not uploaded_file:
        frappe.throw(_("No file attached"))

    filename = secure_filename(uploaded_file.filename)
    file_path = os.path.join("sites", "assets", "uploaded_files", filename)

    with open(file_path, "wb") as f:
        f.write(uploaded_file.stream.read())

    # Attach the file to the specified DocType and DocName
    doc = frappe.get_doc(doctype, docname)
    doc.append("attachments", {
        "file_url": "/" + file_path,
        "file_name": filename,
    })
    doc.save()

    return _("File uploaded successfully.")
