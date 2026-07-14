"use strict";

const URL_PATTERN = /^https?:\/\//;

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow hardcoded absolute URLs in source files. Read the base URL from the env module (framework/config/env) instead."
    },
    messages: {
      hardcodedUrl:
        "Hardcoded absolute URL is not allowed. Read the base URL from env.BASE_URL (framework/config/env) and use a relative path."
    },
    schema: []
  },
  create(context) {
    return {
      Literal(node) {
        if (typeof node.value !== "string") return;
        if (URL_PATTERN.test(node.value)) {
          context.report({ node, messageId: "hardcodedUrl" });
        }
      },
      TemplateLiteral(node) {
        if (node.expressions.length !== 0) return;
        const first = node.quasis[0];
        if (first && URL_PATTERN.test(first.value.cooked ?? "")) {
          context.report({ node, messageId: "hardcodedUrl" });
        }
      }
    };
  }
};
