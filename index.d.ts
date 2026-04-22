import type { AggregatedResult } from '@jest/test-result';
import type { Config } from '@jest/types';
import type { ReporterOptions } from './src/types';

declare function JestSonarReporter(
  globalConfig: Config.GlobalConfig | AggregatedResult,
  options: Partial<ReporterOptions>
): void;

export default JestSonarReporter;
