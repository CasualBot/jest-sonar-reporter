/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  rootDir: ".",
  preset: "ts-jest",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx|js|ts)?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coverageReporters: ["lcov"],
  moduleFileExtensions: ["js", "ts", "jsx", "json", "node"],
  moduleDirectories: ["node_modules", "bower_components", "src"],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  coverageDirectory: "coverage",
  reporters: [
    "default",
    [
      ".",
      {
        relativePaths: true,
        outputName: "jest-sonar.xml",
        outputDirectory: "coverage/",
      },
    ],
  ],
};
