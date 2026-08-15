import { z } from "zod";
import { loginSchema } from "../schemas/auth";
import { userSchema } from "../features/user/schemas";
import { createAxiosInstance } from ".";

const authAxios = createAxiosInstance("/api/v1/auth");

export async function logInApi(data: z.infer<typeof loginSchema>) {
  const response = await authAxios({
    method: "POST",
    url: "/login",
    data: loginSchema.parse(data),
  });
  return userSchema.parse(response.data);
}

export async function logOutApi() {
  const response = await authAxios({
    method: "POST",
    url: "/logout",
  });
  return response.data;
}
