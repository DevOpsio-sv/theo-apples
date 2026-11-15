import { describe, expect, it } from "vitest";
import { formatArtworkStatus, formatEdition, formatPrice } from "../../src/lib/format";

describe("formatArtworkStatus", () => {
  it("maps known statuses", () => {
    expect(formatArtworkStatus("private_collection")).toBe("Private collection");
    expect(formatArtworkStatus("price_on_request")).toBe("Price on request");
  });
});

describe("formatEdition", () => {
  it("formats limited editions", () => {
    expect(formatEdition({ type: "limited", total: 12 })).toBe("Edition of 12");
    expect(formatEdition({ type: "unique" })).toBe("Unique work");
  });
});

describe("formatPrice", () => {
  it("formats euro cents", () => {
    expect(formatPrice(250000)).toContain("2");
  });
});
