// Copyright (c) 2023, Hubtoo and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Hublms Quiz", {
// 	refresh(frm) {

// 	},
// });



frappe.ui.form.on("Hublms Quiz", {
   
    refresh: function(frm) {
        
    },
    randomize_questions: function(frm) {
        // This function will be executed when the "randomize_questions" field changes
        if (frm.doc.randomize_questions && (frm.doc.subset == 0) ) {
            // If the checkbox is checked, set the value of the data field
            frm.set_value('subset', frm.doc.questions.length);
        } 
    },
    validate: function(frm) {
        // Get the value of the "my_data_field" and the maximum allowed value
        const myDataFieldValue = frm.doc.subset;
        const maxValue = frm.doc.questions.length; // Change this to your desired maximum value

        if (myDataFieldValue > maxValue) {
            frappe.msgprint(__('Value in "subset" cannot exceed ' + maxValue));
            frappe.validated = false; // Prevent saving the form
        }
    },
    add_multiple: function(frm) {
        new frappe.ui.form.MultiSelectDialog({
            doctype: "Hublms Question", // Replace with your actual DocType
            target: this.cur_frm,
            columns: {'question':null},
            setters: {'title':null},
            // allow_child_item_selection: 1,
            // child_fieldname: "questions", // child table fieldname, whose records will be shown &amp; can be filtered
            // child_columns: ["questions"], // child item columns to be displayed
            action(selections) {
                // When the user confirms the selection
                $.each(selections, function(index, item) {
                    var child = frm.add_child('questions');
                    child.question = item;
                });
    
                // Refresh the child table and close the dialog
                frm.refresh_field('questions');
            },
           
            onload_post_render: function(frm) {
                console.log("test");
                frm.find(".btn-secondary").addClass("hidden");
            },
        });
        

    },
    
    
	refresh(frm) {

	},
});
frappe.ui.form.on("Hublms Quiz Question", {
	marks: function (frm) {
		total_marks = 0;
		frm.doc.questions.forEach((question) => {
			total_marks += question.marks;
		});
		frm.doc.total_marks = total_marks;
	},
});