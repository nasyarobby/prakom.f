import { decode } from "jsonwebtoken";
export default function useAuth() {
  console.log("Checking token");
  const token = localStorage.getItem("token");

  const user = token ? decode(token) : {};
  // TODO: perlu dicek ulang
  const isLoggedIn = token ? true : false;

  return { isLoggedIn, user, token };
}
