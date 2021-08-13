module.exports = {
  maxWorkers: "50%",
  testEnvironment: "jsdom",
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // transform: {
  //   "^.+\\.(ts|tsx)$": "ts-jest",
  // },
  testPathIgnorePatterns: ["<rootDir>/.next/"],
};
