import xml from 'xml';
import { failure } from './failure';

describe('failure', () => {
  test('<failure message=""></failure>', () => {
    //Arrange
    const actualReport = xml(failure('Lorem ispum'));
    // Act
    // Assert
    expect(actualReport).toMatchSnapshot();
  });
});
