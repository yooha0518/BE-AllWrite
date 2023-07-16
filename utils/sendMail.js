const nodemailer = require('nodemailer');
const mjml2html = require('mjml');
// const env = require('../.env');
const transport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: '518hayoung@gmail.com',
		pass: process.env.NODEMAILERKEY,
	},
});

const userTo = "518hayoung@gmail.com";

let contentMessage = "";

const setMailOption = (to, subject, text, contentMessage, fontSize) => {
	const { html } = mjml2html(
		`
    <mjml>
    <mj-body>
      <mj-section padding="1px 0px">
        <mj-column background-color="#e2f5ff">
          <mj-image src="https://api-test.emailbuilder.top/saemailbuilder/467e50d3-b190-4144-b8d4-d0e9051ceb25/images/7828f383-8ce8-4a35-b874-1a1493a3383f/file.png"></mj-image>
          <mj-spacer padding="5px 0px">
  
          </mj-spacer>
          <mj-text padding="35px 25px">
            <div style="text-align: center;"><span style="background-color: rgba(0, 0, 0, 0);"><font size="5" face="Comic Sans MS" color="#45ad7f">${text}</font></span></div>
          </mj-text>
          <mj-text padding="68px 25px">
            <div style="text-align: center;"><span style="background-color: rgba(0, 0, 0, 0);"><font size="5" face="Comic Sans MS" color="#e86b7e">${contentMessage}</font></span></div>
          </mj-text>
          <mj-spacer padding="17px 0px">
  
          </mj-spacer>
          <mj-text padding="0px 25px">
            <div style="text-align: center;"><span>&nbsp;</span><span style="background-color: rgba(0, 0, 0, 0); font-size: 12px; white-space: pre;">© AllWrite's Accountants Inc., All Rights Reserved.</span></div>
          </mj-text>
          <mj-image padding="0px 25px" src="https://api-test.emailbuilder.top/saemailbuilder/467e50d3-b190-4144-b8d4-d0e9051ceb25/images/92f8ed9d-218c-465a-b9a0-b2abbaef88a0/file.png"></mj-image>
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
