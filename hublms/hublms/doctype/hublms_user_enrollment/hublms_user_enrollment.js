// Copyright (c) 2023, Hublms and contributors
// For license information, please see license.txt

frappe.ui.form.on("Hublms User Enrollment", {
	
    view_progress: function(frm) {
        let apiUrl = `hublms.hublms.doctype.hublms_user_enrollment.hublms_user_enrollment.test`;
        frappe.call({
            method: apiUrl,
            args: {
                course: frm.doc.course,
                progress: frm.doc.progress,
                member: frm.doc.member
            },
            callback: function(response) {
                if (response.message) {
                    frappe.msgprint(response.message);
                }
            }
        });
        
    },
    
	refresh(frm) {
        
    },
    preview: function(frm) {

    },
    // course: function (frm) {
    //     // Clear existing values in the instructor field
    //     frm.set_value('instructors', '');
    //     alert("test");
    //     // Fetch instructors based on the selected course
    //     frappe.call({
    //         method: 'hublms.hublms.doctype.hublms_user_enrollment.hublms_user_enrollment.get_instructors',
    //         args: {
    //             course: frm.doc.course
    //         },
    //         callback: function (r) {
    //             if (r.message) {
    //                 // Set the fetched instructors in the instructor field
    //                 frm.set_value('instructors', r.message);
    //             }
    //         }
    //     });
    // }
    course: function (frm) {
        // Clear existing options in the instructor field
        frm.fields_dict['instructors'].get_query = function (doc, cdt, cdn) {
            var d = locals[cdt][cdn];
            return {
                query: 'hublms.hublms.doctype.hublms_user_enrollment.hublms_user_enrollment.get_instructors',
                filters: {
                    'course': d.course
                }
            };
        };
        frm.set_query("member", function(){
            return {
                filters: {
                    "ignore_user_type": 1
                }
            }
        });
    }
});
frappe.ui.form.on("Hublms User Enrollment", "onload", function(frm){
    console.log("test");
    frm.set_query("member", function(){
        return {
            filters: {
                "ignore_user_type": 1
            }
        }
    });
});
