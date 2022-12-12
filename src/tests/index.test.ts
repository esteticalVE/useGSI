import { loadGSIScript } from "../loadGSIScript";

describe("loadGSIScript", () => {
  it("creates and returns a Promise", () => {
    const promise = loadGSIScript();
    expect(promise).toBeInstanceOf(Promise);
  });
});

// TODO
