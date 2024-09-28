import frappe
from frappe import _
from frappe.utils import cstr, flt
from hublms.hublms.md import markdown_to_html
from hublms.hublms.utils import  get_membership
from hublms.hublms.utils import (
	get_lesson_url,
	# has_course_moderator_role,
	# is_instructor,
	# has_course_evaluator_role,
)
# from hublms.www.utils import (
# 	get_common_context,
# 	redirect_to_lesson,
# 	get_current_lesson_details,
# )


def get_context(context):
    topic_index = frappe.form_dict.get("topic")
    content_index = frappe.form_dict.get("content")
    course_name = frappe.form_dict.get("course")
    content_number = f"{topic_index}.{content_index}"
    context.content_number = content_number
    context.topic_index = topic_index
    context.content_index = content_index
    context.course = frappe.db.get_value(
		"Hublms Course",
		frappe.form_dict["course"],
		["name", "title", "video_link", "enable_certification", "status"],
		as_dict=True,
	)
    

    context.topic = frappe.db.get_value(
        "Hublms Topic Reference", {"idx": topic_index, "parent": course_name}, "topics"
    )
    content = frappe.db.get_value(
        "Hublms Topic Content", {"idx": content_index, "parent": context.topic}, ["content","creation"], as_dict=True
    )
    context.topic_content = []
    context.creation = []
    if content:
        context.topic_content = content.content
        context.creation = content.creation
    
        context.show_lesson = True
        context.page_context = {
            "course": context.course.name,
            "content": content.content if content else "New Content",
            "is_member": context.membership is not None,
        }
    neighbours = get_neighbours(course_name,content_number, context.topic_content)
    print("------------------")
    print(context.course.query_parameter)
    print("------------------")
    context.next_url = get_url(neighbours["next"], context.course)
    context.prev_url = get_url(neighbours["prev"], context.course)
    
    membership = get_membership(context.course.name, frappe.session.user)
    context.membership = membership
    context.progress = frappe.utils.cint(membership.progress) if membership else 0
    
    

	
def get_url(lesson_number, course):
    return (
        get_lesson_url(course.name, lesson_number)
        
    )
def get_neighbours(course_name, current, topic_contents):
    topics = frappe.db.get_all(
        "Hublms Topic Reference",
        filters={"parent": course_name},
        fields=["topics","idx"],
        order_by="idx ASC"
        
        
    )
    
    topic_contents = []
    for topic in topics:
        contents = frappe.db.get_all(
            "Hublms Topic Content", 
            filters={"parent": topic.topics}, 
            fields=["content","idx"],
            order_by="idx ASC"
        )
        
        for content in contents:
            content.number = f"{topic.idx}.{content.idx}"
            topic_contents.append(content)
    
    numbers = [content.number for content in topic_contents]
    tuples_list = [tuple(int(x) for x in s.split(".")) for s in numbers]
    sorted_tuples = sorted(tuples_list)
    sorted_numbers = [".".join(str(num) for num in t) for t in sorted_tuples]
    index = sorted_numbers.index(current)

    return {
        "prev": sorted_numbers[index - 1] if index - 1 >= 0 else None,
        "next": sorted_numbers[index + 1] if index + 1 < len(sorted_numbers) else None,
    }
  