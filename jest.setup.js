import "whatwg-fetch";
import "dotenv/config";
import "setimmediate";

jest.mock("./src/firebase/env", () => ({ ...process.env }));
jest.mock("./src/helpers/env", () => ({ ...process.env }));
