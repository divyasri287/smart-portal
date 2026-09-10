const User = require('../models/User');
const Farmer = require('../models/Farmer');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/generateToken');

class AuthService {
  async registerUser(userData) {
    const { name, email, mobile, password, role, district, state } = userData;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw new Error('Email is already registered');
    }

    const existingMobile = await User.findOne({ mobile });
    if (existingMobile) {
      throw new Error('Mobile number is already registered');
    }

    const user = await User.create({
      name,
      email,
      mobile,
      password,
      role: role || 'Farmer',
      district: district || 'Ludhiana',
      state: state || 'Punjab'
    });

    if (user.role === 'Farmer') {
      const farmerCount = await Farmer.countDocuments();
      const farmerId = `FRM-${1001 + farmerCount}`;
      await Farmer.create({
        farmerId,
        user: user._id,
        name: user.name,
        aadhaar: 'XXXX-XXXX-' + Math.floor(1000 + Math.random() * 9000),
        mobile: user.mobile,
        cropType: 'Paddy (Grade A)',
        acreage: 10.0,
        district: user.district,
        state: user.state,
        bankAccount: 'SBIN0001234 - xxxx' + Math.floor(1000 + Math.random() * 9000)
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        district: user.district,
        state: user.state
      },
      token: accessToken,
      refreshToken
    };
  }

  async loginUser(emailOrMobile, password, role) {
    const user = await User.findOne({
      $or: [{ email: emailOrMobile.toLowerCase() }, { mobile: emailOrMobile }]
    }).select('+password');

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    if (role && user.role !== role) {
      user.role = role;
      await user.save();
    }

    user.lastLogin = new Date();
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    return {
      token: accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        district: user.district,
        state: user.state
      }
    };
  }

  async refreshToken(token) {
    const decoded = verifyRefreshToken(token);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== token) {
      throw new Error('Invalid or expired refresh token');
    }

    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    user.refreshToken = newRefreshToken;
    await user.save();

    return {
      token: accessToken,
      refreshToken: newRefreshToken
    };
  }

  async getUserProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

module.exports = new AuthService();
