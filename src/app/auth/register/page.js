import { createUser } from "@/app/api/auth/actions";
import Register from "@/app/auth/register/Register";
import { redirect } from "next/navigation";
import { createHash } from "@/app/api/auth/util";
import { cookies } from "next/headers";
export default async function Page() {
  async function onCreateRecord(data) {
    "use server";
    const { user, token, error } = await createUser(
      data.name,
      data.email,
      await createHash(data.password)
    );
    if (error) return error;
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
      redirect("/");
    }
  }
  return (
    <div>
      <Register onCreateRecord={onCreateRecord} />
    </div>
  );
}
