export default (json: any, env: string = 'default'): Object => {
  const jestSonarConfig: any = {};
  const envConfig: any = {};
  const allEnvConfig: any = mapAllEnvConfig(jestSonarConfig);

  return Object.assign(allEnvConfig, envConfig[env])

}

export const JEST_SONAR_KEY = 'jestSonar';
export const ENV_KEY = 'env';
export const blacklist = [ENV_KEY];


function mapAllEnvConfig(jestSonarConfig: any): Object {
  return Object.keys(jestSonarConfig)
            .filter(key => !blacklist.includes(key))
            .reduce((acc: any, key: any) => {
              acc[key] = jestSonarConfig[key]
              
              return acc
            }, {});
}