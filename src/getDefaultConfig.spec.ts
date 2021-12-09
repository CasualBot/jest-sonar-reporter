import { getDefaultConfig } from './getDefaultConfig';

describe('getDefaultConfig', () => {
  test('should retrieve default configuration', () => {
    expect.assertions(1)

    const root = '/'

    const defaultConfig = getDefaultConfig(root)

    expect(defaultConfig).toMatchSnapshot()
  })
})
