import xml from 'xml';
import { buildFile } from './file';

describe('file', () => {
  test('<file path=""></file>', () => {
    // Arrange
    const mock = {
      testFilePath: 'test/FooTest.js',
      testResults: []
    };

    // Act
    const actualReport = xml(buildFile(mock, false, null));

    // Assert
    expect(actualReport).toMatchSnapshot();
  });

  test('testCase tag', () => {
    // Arrange
    const mock = {
      testFilePath: 'test/FooTest.js',
      testResults: [{ title: 'lorem ipsum' }, { title: 'lorem ipsum' }]
    };

    // Act
    const actualReport = xml(buildFile(mock, false, null), true);

    // Assert
    expect(actualReport).toMatchSnapshot();
  });

  test('testCase projectRoot', () => {
    // Arrange
    const mock = {
      testFilePath: 'test/FooTest.js',
      testResults: []
    };

    // Act
    const actualReport = xml(buildFile(mock, true, 'test'), true);

    // Assert
    expect(actualReport).toMatchSnapshot();
  });
});
