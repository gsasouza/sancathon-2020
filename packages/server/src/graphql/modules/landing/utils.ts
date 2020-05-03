import mailgun from 'mailgun-js';

import { MAILGUN_API_KEY, MAILGUN_DOMAIN } from '../../../common';

const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });

export const sendEmail = ({ from = '', to, subject, text }) =>
  new Promise((resolve, reject) => {
    mg.messages().send({ from, to, subject, text }, (error, body) => (error ? reject(error) : resolve(body)));
  });
