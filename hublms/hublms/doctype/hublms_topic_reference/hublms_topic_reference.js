frappe.ui.form.on('Hublms Topic Reference', {
    refresh: function(frm) {
        // Add a trigger on child_field to update options
        frm.fields_dict['prerequisite'].get_query = function(doc, cdt, cdn) {
            return {
                filters: {
                    // Exclude the value selected in parent_field from options
                    'name': ['not in', [doc.parent_field]]
                }
            };
        };
    }
});


