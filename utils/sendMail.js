const nodemailer = require("nodemailer");
const mjml2html = require("mjml");
const env = require("../.env");
const transport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: "518hayoung@gmail.com",
		pass: env.NODEMAILERKEY,
	},
});

const userTo = "518hayoung@gmail.com";

let contentMessage = "";

const setMailOption = (to, subject, text, contentMessage, fontSize) => {
	const { html } = mjml2html(
		`
    <mjml>
  <mj-body>
    <mj-section>
      <mj-column background-color="#e2f5ff">
        <mj-image padding="1px 25px" src="https://api-test.emailbuilder.top/saemailbuilder/cee8d0e0-88a7-4799-865a-0d5b4b8cc736/images/5fccae12-86fc-4eaf-af7c-433199b43521/file.png" width="550px"></mj-image>
        <mj-text padding="29px 25px">
          <div style="text-align: center;"><font face="Comic Sans MS" color="#fab402"><span style="font-size: xxx-large; background-color: rgba(0, 0, 0, 0);">All </span><span style="font-size: xxx-large; background-color: rgba(0, 0, 0, 0);">Write</span></font></div>
        </mj-text>
        <mj-spacer padding="5px 0px"></mj-spacer>
        <mj-text padding="35px 25px">
          <div style="text-align: center;"><span style="background-color: rgba(0, 0, 0, 0);"><font size="5" face="Comic Sans MS" color="#45ad7f">${text}</font></span></div>
        </mj-text>
        <mj-text padding="26px 25px">
          <div style="text-align: center;"><span style="background-color: rgba(0, 0, 0, 0);"><font size="6" face="Comic Sans MS" color="#e86b7e">${contentMessage}</font></span></div>
        </mj-text>
        <mj-spacer padding="17px 0px"></mj-spacer>
        <mj-text padding="1px 25px">
          <div style="text-align: center;"><span>&nbsp;</span><span style="background-color: rgba(0, 0, 0, 0); font-size: 12px; white-space: pre;">© AllWrite's Accountants Inc., All Rights Reserved.</span></div>
        </mj-text>
        <mj-image padding="0px 25px" src="https://api-test.emailbuilder.top/saemailbuilder/cee8d0e0-88a7-4799-865a-0d5b4b8cc736/images/f215499f-12bd-403f-9a47-9e249db61e41/file.png"></mj-image>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
    `
	);

	new Promise((resolve, reject) => {
		const message = {
			from: userTo,
			to,
			subject,
			text,
			html: html,
		};

		transport.sendMail(message, (err, info) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(info);
		});
	});
};

module.exports = setMailOption;
