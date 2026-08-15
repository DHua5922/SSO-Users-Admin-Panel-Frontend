import { setupServer } from "msw/node";
import useStatusStore from "../store/status";

export const server = setupServer();

beforeAll(() => server.listen());

beforeEach(() => {
  if (!HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = function () {
      this.open = true;
    };
  }

  if (!HTMLDialogElement.prototype.close) {
    HTMLDialogElement.prototype.close = function () {
      this.open = false;
      this.dispatchEvent(new Event("close"));
    };
  }
});

afterEach(() => {
  server.resetHandlers();
  useStatusStore.setState({ pageAlerts: [], modalAlerts: [] });
});

afterAll(() => server.close());
