import { HttpResponse, http } from "msw";
import {
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  SUCCESS_STATUS_CODE,
  testRoles,
} from "../../../constants";
import { server } from "../../vitest.setup";

const endpoint = "*/api/v1/roles";

export function mockGetRolesSuccessApi(list = testRoles) {
  server.use(
    http.get(endpoint, () => {
      return HttpResponse.json(list, { status: SUCCESS_STATUS_CODE });
    }),
  );
}

export function mockGetRolesFailureApi() {
  server.use(
    http.get(endpoint, () => {
      return HttpResponse.json("Cannot load roles", {
        status: INTERNAL_SERVER_ERROR_STATUS_CODE,
      });
    }),
  );
}
