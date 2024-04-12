import express from 'express';
import { Request, Response } from 'express';
import UserModel, { UserDocument } from '../../../server/schemas/User.ts';

export const signupHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await UserModel.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
  
      const newUser = await UserModel.create({ email, password });
      res.status(201).json({ message: 'Signup successful', user: newUser });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };