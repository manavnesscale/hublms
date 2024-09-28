// Copyright (c) 2023, Hublms and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Hublms Enrollment", {
// 	refresh(frm) {

// 	},
// });



frappe.ui.form.on("Hublms Enrollment", {
   
    
    add_multiple: function(frm) {
        new frappe.ui.form.MultiSelectDialog({
            doctype: 'User',
            target: this.cur_frm,
            setters: {
                // Optional setters to set additional fields when an item is selected
                full_name: function (item) {
                    return item.full_name;
                },
                // Add more setters as needed
            },
            
            primary_action: function (selected_items) {
                // Callback function when the user clicks the "Done" button
                // Use selected_items to get the selected items
            },
            action: {
                // Optional configuration for the action buttons
                primary: {
                    label: __('Done'),
                    onclick: function () {
                        // Additional action when the "Done" button is clicked
                    }
                },
                // Add more action buttons as needed
            },
            fields: ['Full Name'], // Specify the fields to be displayed in the dialog
            get_values: function () {
                // Override the get_values method to use the Full Name as the display value
                return this.data;
            },
        });
        

    },
    
    
	refresh(frm) {

	},
    
});
