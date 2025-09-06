import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

// Example user data for demonstration; replace with your DB logic
const users = [
  { email: 'user@example.com', passwordHash: '$2b$10$yxZJ5jdYm5ViqH7fKiMQJO24gWqD6LE5VZtAHD3b7ORgK8E7lHYF6' }, // password: "password123"
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = users.find(u => u.email === email);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // TODO: Create session or JWT token here

    return NextResponse.json({ message: 'Sign in successful' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
