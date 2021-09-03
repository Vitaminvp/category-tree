import { ERR_EMPTY_STR } from "./config";

describe("Don't want to exclude config.ts from coverage", () => {
  test("This test gives 100% coverage to config.ts", () => {
    expect(ERR_EMPTY_STR).toEqual("Please, enter at least one symbol");
  });
});
