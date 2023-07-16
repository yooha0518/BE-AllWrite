const nodemailer = require('nodemailer');
const mjml2html = require('mjml');
// const env = require('../.env');
const transport = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: '518hayoung@gmail.com',
		pass: process.env.NODEMAILERKEY,
	},
});

const userTo = '518hayoung@gmail.com';

let contentMessage = '';

const setMailOption = (to, subject, text) => {
	if (subject === 'All Write 임시 비밀번호') {
		contentMessage = '로그인후 비밀번호를 변경해 주세요.';
	} else {
		contentMessage = 'All Write의 인증번호 입니다. 인증을 완료해 주세요.';
	}

	const { html } = mjml2html(
		`
    <mjml>
  <mj-body>
    <mj-section background-color="#ffbfd9" background-repeat="no-repeat" border-left="2px solid #b0b0b0" border-radius="10px 10px 0px 0px" border-right="2px solid #b0b0b0" border-top="2px solid #b0b0b0">
      <mj-column>
        <mj-text padding="60px 25px">
          <div style="text-align: center;"><font color="#ffffff" size="7"><b>All Wirte</b></font></div>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section border-left="2px solid #b0b0b0" border-right="2px solid #b0b0b0" padding="60px 0px">
      <mj-column>
        <mj-text padding="4px 25px">
          <div style="text-align: center;"><span style="background-color: rgba(0, 0, 0, 0);"><font size="7">${text}</font></span></div>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section border-left="2px solid #b0b0b0" border-right="2px solid #b0b0b0" padding="1px 0px">
      <mj-column>
        <mj-text padding="38px 25px">
          <div style="text-align: center;"><font size="4" face="Comic Sans MS"><b><span style="background-color: rgba(0, 0, 0, 0);"></span><font style="background-color: rgba(0, 0, 0, 0);">${contentMessage}&nbsp;</font></b></font></div>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section border-bottom="2px solid #b0b0b0" border-left="2px solid #b0b0b0" border-radius="0px 0px 10px 10px" border-right="2px solid #b0b0b0" padding="33px 0px">
      <mj-column>
        <mj-text>
          <div style="text-align: center; font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;">&copy; AllWrite's Accountants Inc., All Rights Reserved.</div>
        </mj-text>
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
