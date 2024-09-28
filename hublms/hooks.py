app_name = "hublms"
app_title = "Hublms"
app_publisher = "Hublms"
app_description = "Hublms"
app_email = "info@hublms.com"
app_license = "mit"
# required_apps = []

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/hublms/css/hublms.css"
# app_include_js = "/assets/hublms/js/hublms.js"

# include js, css files in header of web template
# web_include_css = "/assets/hublms/css/hublms.css"
# web_include_js = "/assets/hublms/js/hublms.js"
# include js, css files in header of web template
web_include_css = "lms.bundle.css"
# web_include_css = "/assets/hublms/css/lms.css"
web_include_js = ["website.bundle.js"]

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "hublms/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "hublms/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]
website_generators = ["Hublms Course"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "hublms.utils.jinja_methods",
#	"filters": "hublms.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "hublms.install.before_install"
# after_install = "hublms.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "hublms.uninstall.before_uninstall"
# after_uninstall = "hublms.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "hublms.utils.before_app_install"
# after_app_install = "hublms.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "hublms.utils.before_app_uninstall"
# after_app_uninstall = "hublms.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "hublms.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
#	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
#	"*": {
#		"on_update": "method",
#		"on_cancel": "method",
#		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"hublms.tasks.all"
#	],
#	"daily": [
#		"hublms.tasks.daily"
#	],
#	"hourly": [
#		"hublms.tasks.hourly"
#	],
#	"weekly": [
#		"hublms.tasks.weekly"
#	],
#	"monthly": [
#		"hublms.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "hublms.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "hublms.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "hublms.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["hublms.utils.before_request"]
# after_request = ["hublms.utils.after_request"]

# Job Events
# ----------
# before_job = ["hublms.utils.before_job"]
# after_job = ["hublms.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"hublms.auth.validate"
# ]

update_website_context = [
	"hublms.widgets.update_website_context",
]

# Add all simple route rules here
website_route_rules = [
	{"from_route": "/hublms/programs/<program>", "to_route": "hublms/programs"},
	{"from_route": "/hublms/course/<course>", "to_route": "hublms/course"},
	{"from_route": "/hublms/topics/<topics>", "to_route": "hublms/topics"},
	{"from_route": "/hublms/quiz_result/<subname>", "to_route": "hublms/quiz_result"},
 
 	# {	"from_route": "/hublms/course/<course>/learn", "to_route": "hublms/learn"},
	{
		"from_route": "/hublms/course/<course>/learn/<int:topic>.<int:content>",
		"to_route": "hublms/learn",
	},
	{"from_route": "/hublms/submission/<subname>", "to_route": "hublms/submission"},
	
]
jinja = {
	"methods": [
		"hublms.hublms.utils.shuffle",
		"hublms.hublms.utils.truncate",
		"hublms.hublms.utils.get_instructors",
		"hublms.hublms.utils.get_topic_count",
		"hublms.hublms.utils.get_topics",
		"hublms.hublms.utils.get_topic_contents",
		"hublms.hublms.utils.render_html",
		"hublms.hublms.utils.get_lesson_url",
		"hublms.hublms.utils.get_progress",
  
		"hublms.page_renderers.get_profile_url",
		"hublms.overrides.user.get_enrolled_courses",
		"hublms.overrides.user.get_course_membership",
		"hublms.overrides.user.get_authored_courses",
		"hublms.overrides.user.get_palette",
		"hublms.hublms.utils.get_membership",
		"hublms.hublms.utils.get_tags",
		"hublms.hublms.utils.get_students",
		"hublms.hublms.utils.get_average_rating",
		"hublms.hublms.utils.is_certified",
		"hublms.hublms.utils.get_lesson_index",
		"hublms.hublms.utils.get_slugified_chapter_title",
		"hublms.hublms.utils.is_mentor",
		"hublms.hublms.utils.is_cohort_staff",
		"hublms.hublms.utils.get_mentors",
		"hublms.hublms.utils.get_reviews",
		"hublms.hublms.utils.is_eligible_to_review",
		"hublms.hublms.utils.get_initial_members",
		"hublms.hublms.utils.get_sorted_reviews",
		"hublms.hublms.utils.is_instructor",
		"hublms.hublms.utils.convert_number_to_character",
		"hublms.hublms.utils.get_signup_optin_checks",
		"hublms.hublms.utils.get_popular_courses",
		"hublms.hublms.utils.format_amount",
		"hublms.hublms.utils.first_lesson_exists",
		"hublms.hublms.utils.get_courses_under_review",
		"hublms.hublms.utils.has_course_instructor_role",
		"hublms.hublms.utils.has_course_moderator_role",
		"hublms.hublms.utils.get_certificates",
		"hublms.hublms.utils.format_number",
		"hublms.hublms.utils.get_all_memberships",
		"hublms.hublms.utils.get_filtered_membership",
		"hublms.hublms.utils.show_start_learing_cta",
		"hublms.hublms.utils.can_create_courses",
		"hublms.hublms.utils.get_telemetry_boot_info",
		"hublms.hublms.utils.is_onboarding_complete",
		"hublms.www.utils.is_student",
  
	]
}
hublms_markdown_macro_renderers = {
	"Exercise": "hublms.plugins.exercise_renderer",
	"Quiz": "hublms.plugins.quiz_renderer",
	"YouTubeVideo": "hublms.plugins.youtube_video_renderer",
	"Video": "hublms.plugins.video_renderer",
	"Assignment": "hublms.plugins.assignment_renderer",
	"Embed": "hublms.plugins.embed_renderer",
	"Audio": "hublms.plugins.audio_renderer",
	"PDF": "hublms.plugins.pdf_renderer",
	"Article": "hublms.plugins.article_renderer",
}

gradebooks = "hublms.hublms.page.gradebook.gradebook.get_gradebooks"
leaderboards = "frappe.desk.leaderboard.get_leaderboards"

