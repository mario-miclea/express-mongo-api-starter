const changePassword = require('./change-password');
const confirm = require('./confirm');
const forgot = require('./forgot');
const generateOTP = require('./generate-otp');
const login = require('./login');
const logout = require('./logout');
const profile = require('./profile');
const refreshToken = require('./refresh-token');
const reset = require('./reset');
const validateOTP = require('./validate-otp');
const verifyOTP = require('./verify-otp');

module.exports = {
  changePassword,
  confirm,
  forgot,
  generateOTP,
  login,
  logout,
  profile,
  refreshToken,
  reset,
  validateOTP,
  verifyOTP,
};
