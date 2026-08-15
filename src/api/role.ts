import { createAxiosInstance } from ".";
import { z } from "zod";
import { roleSchema, type Role } from "../schemas/role";

const axios = createAxiosInstance("/api/v1/roles");

export async function getAllRolesApi() {
  const response = await axios<Role[]>({
    method: "get",
  });

  return z.array(roleSchema).parse(response.data);
}