// Copyright (c) 2023, Hublms and contributors
// For license information, please see license.txt

frappe.ui.form.on("Hublms Certificate Template", {
    refresh(frm) {
        // Add any logic you need for the 'refresh' event
        
    },
    preview: function(frm) {

        let apiUrl = `/api/method/hublms.hublms.doctype.hublms_certificate_template.hublms_certificate_template.download_pdf?template_id=${frm.doc.name}`;
        let w = window.open(apiUrl);
        if (!w) {
            frappe.msgprint(__("Please enable pop-ups"));
            return;
        }
    },
    
});

