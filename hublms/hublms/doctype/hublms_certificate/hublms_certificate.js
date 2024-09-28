// Copyright (c) 2023, Hublms and contributors
// For license information, please see license.txt

frappe.ui.form.on("Hublms Certificate", {
	refresh(frm) {

	},
    download: function(frm) {

        let apiUrl = `/api/method/hublms.hublms.doctype.hublms_certificate.hublms_certificate.download_pdf?`+
        new URLSearchParams({
            name: frm.doc.name,
            template_id: frm.doc.template,
        }).toString()
        ;
        let w = window.open(apiUrl);
        if (!w) {
            frappe.msgprint(__("Please enable pop-ups"));
            return;
        }
        
    },
});

