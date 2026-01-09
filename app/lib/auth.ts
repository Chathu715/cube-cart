import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// JWT Secret - In production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'cubecart-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d'; // Token expires in 7 days

export interface TokenPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
}

/**
 * Generate JWT token for user
 */
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Hash password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare password with hashed password
 */
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7); // Remove 'Bearer ' prefix
}

/**
 * Get user from request headers (for API routes)
 */
export function getUserFromRequest(request: Request): TokenPayload | null {
  const authHeader = request.headers.get('Authorization');
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

/**
 * Check if user is admin
 */
export function isAdmin(user: TokenPayload | null): boolean {
  return user?.role === 'admin';
}

/**
 * Get admin user from request (returns null if not authenticated or not admin)
 */
export function getAdminFromRequest(request: Request): TokenPayload | null {
  const user = getUserFromRequest(request);

  if (!user || !isAdmin(user)) {
    return null;
  }

  return user;
}
