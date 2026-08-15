import { HttpResponse, http } from "msw";
import {
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  SUCCESS_STATUS_CODE,
} from "../../../../constants";
import { server } from "../../../../tests/vitest.setup";
import type { User } from "../../../../features/user/schemas";
import { testUser } from "../../../../features/user/constants";

const endpoint = "*/api/v1/users";
const deleteEndpoint = `${endpoint}/:id`;

export function mockGetUsersSuccessApi(list: User[]) {
  server.use(
    http.get(endpoint, () => {
      return HttpResponse.json(list, { status: SUCCESS_STATUS_CODE });
    }),
  );
}
export function mockGetUsersFailureApi() {
  server.use(
    http.get(endpoint, () => {
      return HttpResponse.json("Cannot load users", {
        status: INTERNAL_SERVER_ERROR_STATUS_CODE,
      });
    }),
  );
}

export function mockUpsertUserSuccessApi() {
  return server.use(
    http.put(endpoint, async ({ request }) => {
      const body = await request.json();
      return HttpResponse.json(body, { status: SUCCESS_STATUS_CODE });
    }),
  );
}
export function mockUpsertUserFailureApi() {
  return server.use(
    http.put(endpoint, () => {
      return HttpResponse.json("Cannot upsert user", { status: 400 });
    }),
  );
}

export function mockDeleteUserSuccessApi() {
  return server.use(
    http.delete(deleteEndpoint, ({ params }) => {
      return HttpResponse.json(
        { ...testUser, id: params.id },
        { status: SUCCESS_STATUS_CODE },
      );
    }),
  );
}
export function mockDeleteUserFailureApi() {
  return server.use(
    http.delete(deleteEndpoint, () => {
      return HttpResponse.json("Cannot delete user", {
        status: INTERNAL_SERVER_ERROR_STATUS_CODE,
      });
    }),
  );
}
