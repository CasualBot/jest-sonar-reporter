/**
 * Removes ANSI escape sequences from a message and creates a failure XML element
 * @param message The failure message containing potential ANSI color codes
 * @returns XML structure for failure element
 */
export const failure = (message: string): any => {
  // eslint-disable-next-line no-control-regex
  const filteredMessage = message.replace(/([\u001b]\[.{1,2}m)/g, '');
  const shortMessage = filteredMessage.replace(/[\n].*/g, '');
  return {
    failure: {
      _attr: {
        message: shortMessage
      },
      _cdata: filteredMessage
    }
  };
};