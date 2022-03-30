import Results from './interfaces/results';

export default class Report {
  outputDirectory: string;
  options: object;
  report: object;

  constructor() {
    this.options = {};
    this.report = {};
    this.outputDirectory = '';
  }

  public process(results: Results, options: object, rootDir: string): void {
    console.log();
  }
}
