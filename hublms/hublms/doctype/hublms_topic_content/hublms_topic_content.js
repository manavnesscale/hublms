frappe.ui.form.on('Hublms Topic', {
    refresh: function(frm) {
        alert('22');
        // // Add a trigger on linked_child_field to update options
        // frm.fields_dict['linked_child_field'].get_query = function(doc, cdt, cdn) {
        //     return {
        //         filters: {
        //             'parent': doc.parent
        //         }
        //     };
        // };
    }
});