import frappe
from frappe.model.document import Document

class HublmsEnrollment(Document):
    def before_insert(self):
        for value in self.program:
            for row in self.lms_users:
                doc_type_2_doc = frappe.new_doc("Hublms User Enrollment")
                doc_type_2_doc.program = value.programs
                doc_type_2_doc.user = row.user
                doc_type_2_doc.insert()
        for value in self.course:
            for row in self.lms_users:
                doc_type_2_doc = frappe.new_doc("Hublms User Enrollment")
                doc_type_2_doc.course = value.courses
                doc_type_2_doc.user = row.user
                doc_type_2_doc.insert()
        for value in self.topic:
            for row in self.lms_users:
                doc_type_2_doc = frappe.new_doc("Hublms User Enrollment")
                doc_type_2_doc.topic = value.topics
                doc_type_2_doc.user = row.user
                doc_type_2_doc.insert()
                

            
