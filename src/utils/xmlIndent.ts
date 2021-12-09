export default (indent: number) => {
  let spaces = []
  for (let i = 1; i <= indent; i += 1) {
    spaces.push(' ')
  }
  return spaces.join('')
}