// Copyright (c) 2023, Hublms and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Hublms Course", {
// 	refresh(frm) {

// 	},
// });

// frappe.ui.form.on('Hublms Course', {
//     refresh: function(frm) {
//         // Add a trigger on child_field to update options
       
//         frm.fields_dict['course_topics'].grid.get_field('prerequisite').get_query = function(doc, cdt, cdn) {
//             var child_row = locals[cdt][cdn];
//                 // Filter options based on the parent's value
//                 return {
//                     filters: {
//                         'parent': frm.doc.name,
//                         'name': ['!=', child_row.name]
//                     }
                    
//                 };
            
            
//         };
        
//     }
// });
frappe.ui.form.on('Hublms Course', {
    refresh: function(frm) {
        // Add a trigger on child_field to update options
        frm.fields_dict['course_topics'].grid.get_field('prerequisite').get_query = function(doc, cdt, cdn) {
            var child_row = locals[cdt][cdn];
            // Filter options based on the parent's value
            return {
                filters: {
                    'parent': frm.doc.name,
                    'name': ['!=', child_row.name]
                }
            };
        };

        
        
        frm.fields_dict['course_topics'].grid.refresh = function(doc, cdt, cdn) {
            var grid = locals[cdt][cdn].grid;

            grid.wrapper.find('.grid-body .rows ').each(function() {
                alert('te');
                var name = $(this).data('name');
                var prerequisite = frappe.model.get_value(cdt, name, 'prerequisite');
                var prerequisiteTitle = frappe.model.get_value('Hublms Topic Reference', prerequisite, 'topics');
                // Update the displayed value in the Link field
                grid.get_field('prerequisite').grid_form.fields_dict['prerequisite'].df.options = prerequisiteTitle;
                grid.get_field('prerequisite').grid_form.fields_dict['prerequisite'].refresh();
            });
        };
        
    }

});
