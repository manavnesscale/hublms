

frappe.ui.form.on('Hublms Topic', {
    refresh: function(frm) {
        
        frm.fields_dict['topic_content'].grid.get_field('prerequisite').get_query = function(doc, cdt, cdn) {
            var child_row = locals[cdt][cdn];

                // Filter options based on the parent's value
                return {
                    filters: {
                        'parent': frm.doc.name,
                        'name': ['!=', child_row.name]
                    }
                };
            
            
        };
    }
});