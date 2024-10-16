const { error } = require('../../functions');
const { Identity } = require('../../models');
const { authenticator } = require('otplib');
const QRCode = require('qrcode');

module.exports = async (req, res) => {
  if (!req.user?.me) {
    throw error(404, 'Missing required params');
  }

  const { email } = req.user;

  const identity = await Identity.findById(req.user.me).lean();
  if (!identity) {
    throw error(404, 'Account not found');
  }

  const secret = authenticator.generateSecret();
  await Identity.findByIdAndUpdate(req.user.me, { secret });

  QRCode.toDataURL(authenticator.keyuri(email, 'DemoApp', secret), (err, imageUrl) => {
    if (err) {
      return res.status(500).send('Error generating QR code');
    }

    return res.status(200).json({ secret, imageUrl });
  });
};
