const { error } = require('../../functions');
const { Identity } = require('../../models');

module.exports = async (req, res) => {
  if (!req.user?.me) {
    throw error(404, 'Missing required params');
  }

  const identity = await Identity.findById(req.user.me);
  if (!identity) {
    throw error(400, 'User not found');
  }

  identity.otpEnabled = false;
  await identity.save();

  res.status(200).send({ message: '2FA disabled successfully' });
};
