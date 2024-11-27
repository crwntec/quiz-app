import { loginUser } from "@/app/api/auth/actions";
import Login from "@/app/auth/login/Login";
import { cookies } from "next/headers";

export default async function Page() {
  async function onLogin(data) {
    "use server";
    try {
      const { user, token, error } = await loginUser(data.email, data.password);
      if (error) {
        return error;
      }
      if (token) {
        (await cookies()).set({
          name: "token",
          value: token,
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30,
          secure: process.env.NODE_ENV === "production",
          expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
        });
      }
      const redirectURL = (await cookies()).get("redirect")?.value;
      if (redirectURL) {
        return redirectURL;
      } else {
        return "/";
      }
    } catch (error) {
      return null;
    }
  }
  return (
    <div>
      <Login onLogin={onLogin} />
    </div>
  );
}
