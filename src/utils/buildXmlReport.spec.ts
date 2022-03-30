import xml from 'xml';
import buildXmlReport from './buildXmlReport';

describe('buildXmlReport', () => {
  test('root: <buildXmlReport version="1"> when not formatted for sonar 5.6.x', () => {
    const mock = { testResults: [] };

    const actualReport = xml(buildXmlReport(mock, false));

    expect(actualReport).toMatchSnapshot();
  });

  test('root: <unitTest version="1"> when formatted for sonar 5.6.x', () => {
    const mock = { testResults: [] };

    const actualReport = xml(buildXmlReport(mock, true));

    expect(actualReport).toMatchSnapshot();
  });

  test('file tag', () => {
    const mock = {
      testResults: [
        {
          testFilePath: 'test/FooTest.js',
          testResults: []
        },
        {
          testFilePath: 'test/BarTest.js',
          testResults: []
        }
      ]
    };

    const actualReport = xml(buildXmlReport(mock), true);

    expect(actualReport).toMatchSnapshot();
  });

  test('full report', () => {
    const mock = {
      testResults: [
        {
          testFilePath: 'test/FooTest.js',
          testResults: [
            {
              duration: 5,
              fullName: 'lorem ipsum'
            }
          ]
        },
        {
          testFilePath: 'test/BarTest.js',
          testResults: [
            {
              duration: 5,
              failureMessages: ['Lorem ipsum'],
              fullName: 'lorem ipsum',
              status: 'failed'
            }
          ]
        }
      ]
    };

    const actualReport = xml(buildXmlReport(mock), true);

    expect(actualReport).toMatchSnapshot();
  });
});
