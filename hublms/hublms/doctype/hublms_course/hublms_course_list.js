frappe.listview_settings['Hublms Course'] = {
    
    
    onload: function(listview) {
        // Get the current logged-in user
        var current_user = frappe.session.user;

        // Set the filter options for the "instructor" field
        frappe.route_options = {
            "instructor": ["in", [current_user]],
        };

        var clearFiltersButton = listview.page.sidebar.find('.filter-x-button');
        
        if (clearFiltersButton) {
            clearFiltersButton.addClass('disabled').prop('disabled', true);
        }
    }
};
