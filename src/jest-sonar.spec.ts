import JestSonar from '../src/jest-sonar';
import GlobalConfiguration from './interfaces/global-config';
describe('JestSonar', () => {
  const globalConfig = jest.fn<GlobalConfiguration, []>(() => {
    return {};
  });
  let jestSonar: JestSonar;
  beforeEach(() => {
    jestSonar = new JestSonar(globalConfig());
  });

  it('should be a function', () => {
    expect(JestSonar).toBeInstanceOf(Function);
  });

  it('consoleBuffer should return type object', () => {
    expect(jestSonar.getConsoleBugger()).toBeInstanceOf(Object);
  });
});
