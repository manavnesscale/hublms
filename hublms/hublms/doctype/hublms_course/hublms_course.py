# Copyright (c) 2023, Hublms and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class HublmsCourse(Document):
	pass
	def validate(self):
		self.validate_video_link()

	def validate_video_link(self):
		if self.video_link and "/" in self.video_link:
			self.video_link = self.video_link.split("/")[-1]
   


def get_list_context():
	print("1-----------------------")
 	


