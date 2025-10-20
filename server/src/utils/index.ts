import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

type Token = {
  id: Types.ObjectId;
};

export const generateJWT = (payload: Token) => {
  const token = jwt.sign(payload, process.env.JWT_TOKEN, {
    expiresIn: "30d",
  });

  return token;
};

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(password, salt);

  return passHash;
}

export async function checkPassword(password: string, passwordHas: string) {
  return await bcrypt.compare(password, passwordHas);
}

export const monthKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
