import { hashSync } from "bcrypt";

export const users = [
  {
    email: "admin1@gmail.com",
    password: hashSync("123456", 10),
    isAdmin: true,
  },
  {
    email: "user1@gmail.com",
    password: hashSync("123456", 10),
    isAdmin: false,
  },
];
