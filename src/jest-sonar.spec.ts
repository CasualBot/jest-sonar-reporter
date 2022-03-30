import JestSonar from '../src/jest-sonar';
import config from '../__mocks__/config.json';

describe('JestSonar', () => {
  const globalConfig = config;
  let jestSonar: JestSonar;
  beforeEach(() => {
    jestSonar = new JestSonar(globalConfig, {});
  });

  it('should be a function', () => {
    expect(JestSonar).toBeInstanceOf(Function);
  });

  it('consoleBuffer should return type object', () => {
    expect(jestSonar.getConsoleBugger()).toBeInstanceOf(Object);
  });
});
