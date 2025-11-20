import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Company } from '../models/index.js';
import { loadConfig } from "../config/configLoader.js"
import bcrypt from 'bcrypt';

const config = loadConfig();

export async function register(req, res) {
  const { email, password } = req.body;

  try {
    const existingUsers = await User.find({});
    const role = existingUsers.length === 0 ? 'admin' : 'user';

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Имейлът вече е регистриран' });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: 'Регистрация успешна',
      user: { email: newUser.email, role: newUser.role },
    });
  } catch (err) {
    res.status(500).json({ message: 'Грешка при регистрация', error: err.message });
  }
}

export async function refreshToken(req, res) {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'Няма refresh token' });

  try {
    const payload = jwt.verify(token, config.jwt_secret);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'Потребителят не е намерен' });

    const newAccessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      config.jwt_secret,
      { expiresIn: '1m' }
    );

    res.json({ token: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid email or password' });

    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      config.jwt_secret,
      { expiresIn: '1m' }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      config.jwt_secret,
      { expiresIn: '7d' }
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      token: accessToken,
      user: { email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: 'Грешка при вход', error: err.message });
  }
}

export function logout(req, res) {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
  });
  res.json({ message: 'Logged out successfully' });
}


export async function requestAdmin(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.pendingAdminRequest) {
      return res.status(400).json({ message: 'Вече имате заявка за админ!' });
    }

    const { company } = req.body;
    if (!company) {
      return res.status(400).json({ message: 'Company is required' });
    }

    user.pendingAdminRequest = true;
    user.requestedAdminAt = new Date();
    
    let existingCompany = await Company.findOne({ name: company });
    
    if (!existingCompany) {
      existingCompany = new Company({ name: company });
      await existingCompany.save();
    }
    
    user.company = existingCompany._id;
    await user.save();

    res.json({ message: 'Заявката за админ е подадена' });

  } catch (err) {
    res.status(500).json({ message: 'Грешка при заявка', error: err.message });
  }
}

export async function approveAdmin(req, res) {
  const admin = await User.findById(req.user.id);
  if (!admin || admin.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

  const target = await User.findById(req.params.userId);
  if (!target) return res.status(404).json({ message: 'User not found' });
  if (!target.pendingAdminRequest) return res.status(400).json({ message: 'No pending request' });

  target.role = 'admin';
  target.pendingAdminRequest = false;
  target.approvedBy = admin._id;
  target.approvedAt = new Date();
  await target.save();

  res.json({ message: 'Одобрено', user: { email: target.email, role: target.role } });
}

export async function getPendingAdminRequests(req, res) {
  try {
    const admin = req.user;
    if (admin.role !== 'admin') {
      return res.status(403).json({ message: 'Само админ може да вижда заявки' });
    }

    const users = await User.find({ pendingAdminRequest: true });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Грешка при заявките', error: err.message });
  }
}