import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Mock database
const users = [
  { username: "test", password: bcrypt.hashSync("test", 10) },
  { username: "admin", password: bcrypt.hashSync("admin", 10) },
  { username: "lrehman", password: bcrypt.hashSync("admin", 10) },
];

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Check if user exists
  const user = users.find((u) => u.username === username);
  if (!user) {
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );
  }

  // Generate a session token (or use a JWT in production)
  const token = `session_${Date.now()}`; // Example session token

  // Return success response with token
  return NextResponse.json({ message: "Login successful", token });
}
