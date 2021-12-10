# Jest Sonar Reporter

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=CasualBot_jest-sonar-reporter&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=CasualBot_jest-sonar-reporter)
[![Build](https://github.com/CasualBot/jest-sonar-reporter/actions/workflows/test-and-scan.yml/badge.svg)](https://github.com/CasualBot/jest-sonar-reporter/actions/workflows/test-and-scan.yml)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=CasualBot_jest-sonar-reporter&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=CasualBot_jest-sonar-reporter)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=CasualBot_jest-sonar-reporter&metric=coverage)](https://sonarcloud.io/summary/new_code?id=CasualBot_jest-sonar-reporter)

> :warning: **This is currently in development and highly unstable. Use are your own discretion.**

`@CasualBot/jest-sonar-scanner` is a custom results processor for Jest derived from Christian W. original work [here](https://github.com/3dmind/jest-sonar-reporter).

The processor converts Jest's output in to Sonarqube's [generic data format] to be used by `sonar.testExecutionReportPaths` configuration

>I am working towards bringing the original package back to life / providing updates as I require it for every day work and have uses cases I would like to inquire.

## Additions from original
  * [ ] Allow for relative v. absolute pathing for output file mapping
  * [X] Allow to be configured in `jest.config.js` file for `reporters`
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

## Usage
In your jest config add the following entry:
```JSON
{
  "reporters": [ "default", "jest-sonar-reporter" ]
}
```

Then simply run:

```shell
jest
```

For your Continuous Integration you can simply do:
```shell
jest --ci --reporters=default --reporters=jest-sonar-reporter
```

## Usage as testResultsProcessor (deprecated)
The support for `testResultsProcessor` is only kept for [legacy reasons][test-results-processor] and might be removed in the future. 
You should therefore prefer to configure `jest-sonar-reporter` as a _reporter_.

Should you still want to, add the following entry to your jest config:
```JSON
{
  "testResultsProcessor": "jest-sonar-reporter"
}
```

Then simply run:

```shell
jest
```

For your Continuous Integration you can simply do:
```shell
jest --ci --testResultsProcessor="jest-sonar-reporter"
```