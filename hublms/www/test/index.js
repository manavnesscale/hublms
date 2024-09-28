

frappe.ready(() => {
	$(".testButton").click((e) => {
		attach_work(e);
	});
});

const attach_work = (e) => {
	const target = $(e.currentTarget);
	let files = target.siblings(".attach-file").prop("files");
	if (files && files.length) {
		files = add_files(files);
		return_as_dataurl(files);
		files.map((file) => {
			upload_file(file, target);
		});
	}
};
const create_lesson_work = (file, target) => {
	frappe.call({
		method: "hublms.hublms.doctype.hublms_test.hublms_test.upload_assignment",
		args: {
			assignment_attachment: file.file_url,
			// lesson: $(".title").attr("data-lesson"),
			// submission: $(".preview-work").data("submission") || "",
		},
		callback: (data) => {
			target.siblings(".attach-file").addClass("hide");
			target.siblings(".preview-work").removeClass("hide");
			target
				.siblings(".preview-work")
				.find("a")
				.attr("href", file.file_url)
				.text(file.file_name);
			target.addClass("hide");
		},
	});
};
const upload_file = (file, target) => {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();

		xhr.onreadystatechange = () => {
			if (xhr.readyState == XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					let response = JSON.parse(xhr.responseText);
					create_lesson_work(response.message, target);
				} else if (xhr.status === 403) {
					let response = JSON.parse(xhr.responseText);
					frappe.msgprint(
						`Not permitted. ${response._error_message || ""}`
					);
				} else if (xhr.status === 413) {
					frappe.msgprint(
						__("Size exceeds the maximum allowed file size.")
					);
				} else {
					frappe.msgprint(
						xhr.status === 0
							? "XMLHttpRequest Error"
							: `${xhr.status} : ${xhr.statusText}`
					);
				}
			}
		};
		xhr.open("POST", "/api/method/upload_file", true);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.setRequestHeader("X-Frappe-CSRF-Token", frappe.csrf_token);

		let form_data = new FormData();
		if (file.file_obj) {
			form_data.append("file", file.file_obj, file.name);
		}

		xhr.send(form_data);
	});
};
const return_as_dataurl = (files) => {
	let promises = files.map((file) =>
		frappe.dom.file_to_base64(file.file_obj).then((dataurl) => {
			file.dataurl = dataurl;
			this.on_success && this.on_success(file);
		})
	);
	return Promise.all(promises);
};
const add_files = (files) => {
	files = Array.from(files).map((file) => {
		let is_image = file.type.startsWith("image");
		return {
			file_obj: file,
			cropper_file: file,
			crop_box_data: null,
			optimize: this.attach_doc_image ? true : false,
			name: file.name,
			doc: null,
			progress: 0,
			total: 0,
			failed: false,
			request_succeeded: false,
			error_message: null,
			uploading: false,
			private: !is_image,
		};
	});
	return files;
};