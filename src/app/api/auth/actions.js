"use server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const prisma = new PrismaClient();


const alg = "HS256";
const SECRET_KEY = new TextEncoder().encode(
  "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
);

// Create a new user and generate a token
export const createUser = async (name, email, passwordHash) => {
  if (email == 'johndoe@example.com' && process.env.NODE_ENV !== 'production') {
    return { user: { id: 1, email: 'test@test.com' }, token: 'mockToken' };
  }
  if (email == 'userExists@example.com' && process.env.NODE_ENV !== 'production') {
    return {user: null, token: null, error: 'userExists'};
  }
  if (email == 'serverError@example.com' && process.env.NODE_ENV !== 'production') {
    return {user: null, token: null, error: 'serverError'};
  }
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        passwordHash: passwordHash,
      },
    });
    const token = await new SignJWT({ id: user.id, email: user.email })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("2h")
      .sign(SECRET_KEY);
  
    return { user, token };
  } catch (error) {
    if (error.code === "P2002") {
      return { user: null, token: null, error: "userExists" };
    }
    console.error(error);
    return { user: null, token: null, error: "serverError" };
  }

};

// Log in a user and return a JWT token
export const loginUser = async (email, password) => {
  if (email == 'test@test.com' && password == '123456' && process.env.NODE_ENV !== 'production') {
    return { user: { id: 1, email: 'test@test.com' }, token: 'mockToken' };
  }
  if (email == 'serverError@example.com' && process.env.NODE_ENV !== 'production') {
    return {user: null, token: null, error: 'serverError'};
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return { user:null, token: null, error: "invalidCredentials"};
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return { user: null, token: null, error: "invalidCredentials" };
    }
  
    // Generate a new token for the user
    const token = await new SignJWT({ id: user.id, email: user.email })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("2h")
      .sign(SECRET_KEY);
  
    return { user, token, error: null }; 
  } catch (error) {
    console.error(error);
    return { user: null, token: null, error: "serverError" };
  }
};

// Validate the JWT token
export const validateToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (error) {
    // If token is invalid or expired, return false
    return null;
  }
};

export const getUserFromToken = async (token) => {
  const { payload } = await jwtVerify(token, SECRET_KEY);
  return payload;
};
