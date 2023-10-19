import { describe, expect, it } from "vitest";
import { decodeHTMLEntities } from ".";

describe("Utils", () => {
  describe("decodeHTMLEntities", () => {
    it("문자열의 특수 문자 유니코드가 decode 된다.", () => {
      const text = "&lt;Component&gt;&quot;test&quot;&lt;/Component&gt;";
      const decodedText = decodeHTMLEntities(text);
      expect(decodedText).toBe('<Component>"test"</Component>');
    });
  });
});
