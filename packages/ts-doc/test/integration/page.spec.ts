import {expect} from "chai";
import {compilePage, getSnapshot} from "../utils";

const write = false;

describe("Page", () => {
  describe("MaxLength example", () => {
    it("should render a page", async () => {
      const symbols = await compilePage();
      const symbol = symbols.get("MaxLength");

      expect(symbol.content).to.equal(getSnapshot(symbol, write));
    });
  });

  describe("ReturnsChainedDecorators example", () => {
    it("should render a page", async () => {
      const symbols = await compilePage();
      const symbol = symbols.get("ReturnsChainedDecorators");

      expect(symbol.symbolType).to.equal("interface");
      expect(symbol.content).to.equal(getSnapshot(symbol, write));
    });
  });

  describe("RequestContext example", () => {
    it("should render a page", async () => {
      const symbols = await compilePage();
      const symbol = symbols.get("RequestContext");

      expect(symbol.symbolType).to.equal("class");
      expect(symbol.content).to.equal(getSnapshot(symbol, write));
    });
  });

  describe("Ignore example", () => {
    it("should render a page", async () => {
      const symbols = await compilePage();
      const symbol = symbols.get("Ignore");

      expect(symbol.symbolType).to.equal("decorator");
      expect(symbol.content).to.equal(getSnapshot(symbol, write));
    });
  });


  describe("ControllerProvider example", () => {
    it("should render a page", async () => {
      const symbols = await compilePage();
      const symbol = symbols.get("ControllerProvider");

      expect(symbol.content).to.equal(getSnapshot(symbol, write));
    });
  });
});
