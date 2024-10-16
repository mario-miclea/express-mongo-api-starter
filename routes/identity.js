const { Router } = require('express');
const { recaptcha, validate, authenticate } = require('express-goodies/middleware');
const { Identity } = require('../controllers');
const { loginSchema } = require('../schemas');

const router = Router();
module.exports = router;

router.post('/confirm/:hash', recaptcha, Identity.confirm);
router.post('/forgot', recaptcha, Identity.forgot);
router.post('/login', recaptcha, validate(loginSchema), Identity.login);
router.post('/reset/:hash', recaptcha, Identity.reset);

router.post('/logout', Identity.logout);
router.post('/refresh-token', Identity.refreshToken);
router.post('/generate-otp', authenticate, Identity.generateOTP);
router.post('/verify-otp/:token', authenticate, Identity.verifyOTP);
router.post('/validate-otp', Identity.validateOTP);
router.post('/disable-otp', authenticate, Identity.disableOTP);

router.post('/admin/change-password', Identity.changePassword);
router.get('/admin/profile', Identity.profile);
