module.exports = {
  maxWorkers: "50%",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      { tsconfig: { jsx: "react-jsx", esModuleInterop: true } },
    ],
  },
  testPathIgnorePatterns: ["<rootDir>/.next/"],
};
