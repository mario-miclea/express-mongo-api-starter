const { error } = require('../../functions');
const { Identity } = require('../../models');
const { authenticator } = require('otplib');

module.exports = async (req, res) => {
  const { email, token } = req.body;
  if (!email || !token) {
    throw error(400, 'Missing required params');
  }

  const identity = await Identity.findOne({ email: email.toLowerCase() }).lean();
  if (!identity) {
    throw error(404, 'Account not found');
  }

  if (!identity.secret) {
    throw error(404, '2FA is not configured');
  }

  const isValid = authenticator.check(token, identity.secret);

  if (!isValid) {
    throw error(401, 'Invalid 2FA token');
  }

  return res.status(200).json({ identity, message: 'Valid 2FA token' });
};
