import xml from 'xml';
import { skipped } from './skipped';

describe('skipped', () => {
  test('skipped without message', () => {
    // Act
    const actualReport = xml({ element: skipped() }, true);

    // Assert
    expect(actualReport).toMatchSnapshot();
  });

  test('skipped with message', () => {
    // Arrange
    const message = 'Test skipped for some reason';

    // Act
    const actualReport = xml({ element: skipped(message) }, true);

    // Assert
    expect(actualReport).toMatchSnapshot();
  });
});
