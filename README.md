# Jest Sonar Reporter

> :warning: **This is currently in development and highly unstable. Use are your own discretion.**


`@CasualBot/jest-sonar-scanner` is a custom results processor for Jest derived from Christian W. original work [here](https://github.com/3dmind/jest-sonar-reporter).

The processor converts Jest's output in to Sonarqube's [generic data format] to be used by `sonar.testExecutionReportPaths` configuration

>I am working towards bringin the original package back to life / providing updates as I require it for every day work and have uses cases I would like to inquire.

## Additions from original
  * [ ] Allow for relative v. absolute pathing for output file mapping
  * [ ] Allow for monorepo multiple `jest.confi.*` file mappings for `jestSonar` payload
  * [ ] ESM update from CommonJS format
  * [ ] Contribution guidelines & CI/CD to allow for community growth

## Installation

Using npm:

```bash
npm install --save-dev @CasualBot/jest-sonar-reporter
```

Using yarn:

```bash
yarn add --dev @CasualBot/jest-sonar-reporter
```

### Configuration
> Coming soon