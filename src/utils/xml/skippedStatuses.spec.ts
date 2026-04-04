// Regression test for https://github.com/CasualBot/jest-sonar-reporter/issues/34
// Verifies that skipped/todo tests emit <skipped message="..."/> in the generated
// SonarQube report (message attribute is required by the SonarQube parser).

it('passing test', () => {
  expect(true).toBe(true);
});

it.skip('skipped test', () => {
  expect(true).toBe(true);
});

it.todo('todo test');
