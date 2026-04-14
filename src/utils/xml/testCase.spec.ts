import xml from 'xml';
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

  test('skipped test case (pending)', () => {
    // Arrange
    const mock = {
      status: 'pending',
      title: 'lorem ipsum'
    }

    // Act
    const actualReport = xml(testCase(mock), true)

    // Assert
    expect(actualReport).toMatchSnapshot()
  })

  test('skipped test case (it.skip)', () => {
    // Arrange
    const mock = {
      status: 'skipped',
      title: 'lorem ipsum'
    }

    // Act
    const actualReport = xml(testCase(mock), true)

    // Assert
    expect(actualReport).toMatchSnapshot()
  })

  test('skipped test case (todo)', () => {
    // Arrange
    const mock = {
      status: 'todo',
      title: 'lorem ipsum'
    }

    // Act
    const actualReport = xml(testCase(mock), true)

    // Assert
    expect(actualReport).toMatchSnapshot()
  })
})
