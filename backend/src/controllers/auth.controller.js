import { registerUser, loginUser } from '../services/auth.service.js';
import { generateToken } from '../utils/jwt.util.js';

export const register = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    // Validates that either phone or email is provided, matching Register.jsx rules
    if (!phone && !email) {
      return res.status(400).json({ message: 'Phone or Email is required' });
    }

    const user = await registerUser({ name, phone, email, password });
    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, name: user.name },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await loginUser(username, password);
    const token = generateToken(user.id);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name },
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};