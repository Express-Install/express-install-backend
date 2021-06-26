const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');
const config = require('../config/config');
const logger = require('../config/logger');

const method = 'API'; // API || SMTP
const transportConfig =
  method === 'SMTP' ? config.email.smtp : mailgun(config.email.api);
const transport = nodemailer.createTransport(transportConfig);
/* istanbul ignore next */
if (config.env !== 'test' && method === 'SMTP') {
  transport
    .verify()
    .then(() => logger.info('Connected to SMTP server'))
    .catch(() => logger.warn('Unable to connect to SMTP server.'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = {
    from: {
      name: 'Express Install',
      address: config.email.from,
    },
    to,
    subject,
    text,
  };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  const resetPasswordUrl = `https://expressinstall.tech/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  const verificationEmailUrl = `https://expressinstall.tech/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
