import * as xml from 'xml';
import { testCase } from './testCase';

describe('testCase', () => {
  test('<testCase name="" duration=""/>', () => {
    // Arrange
    const mock = {
      duration: 5,
      fullName: 'lorem ipsum'
    }

    // Act
    const actualReport = xml(testCase(mock))

    // Assert
    expect(actualReport).toMatchSnapshot()
  })

  test('failing test case', () => {
    // Arrange
    const mock = {
      failureMessages: ['Lorem ipsum'],
      status: 'failed',
      title: 'lorem ipsum'
    }
 
    // Act
    const actualReport = xml(testCase(mock), true)

    // Assert
    expect(actualReport).toMatchSnapshot()
  })
})
