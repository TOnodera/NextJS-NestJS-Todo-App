import { describe } from "@jest/globals";
describe("jestが正しく動いているか確認", () => {
  it("true is true", () => {
    expect(true).toBeTruthy();
  });
  it("false is false", () => {
    expect(false).toBeFalsy();
  });
});
