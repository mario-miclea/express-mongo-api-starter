const { error } = require('../../functions');
const { Identity } = require('../../models');
const { authenticator } = require('otplib');

module.exports = async (req, res) => {
  if (!req.user?.me) {
    throw error(404, 'Missing required params');
  }

  const { token } = req.params;

  const identity = await Identity.findById(req.user.me);
  if (!identity) {
    throw error(400, 'User not found');
  }

  const isValid = authenticator.check(token, identity.secret);
  if (!isValid) {
    return res.status(401).send({ message: 'Invalid 2FA token' });
  }

  identity.otpEnabled = true;
  await identity.save();

  res.status(200).send({ message: '2FA verification successful' });
};
