
frappe.ready(() => {
	let self = this;
	console.log("sdasd")
    $("#verify").click((e) => {
        verify(e);
    });
});

const verify = () => {
	frappe.call({
		method: "hublms.hublms.doctype.hublms_certificate.hublms_certificate.verfiy_certificate",
		args: {
			code: $(".code").val(),
		},
		callback: (data) => {
			if (data.message == 1) {
                alert("This certificate is valid")
            }else{
                alert("This certificate is invalid")
            }
		},
	});
};
