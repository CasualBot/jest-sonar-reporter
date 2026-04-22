import type { XmlLeaf } from '../../types';

export const failure = (message: string): XmlLeaf => {
  // eslint-disable-next-line no-control-regex
  const filteredMessage = message.replace(/([]\[.{1,2}m)/g, '');
  const shortMessage = filteredMessage.replace(/[\n].*/g, '');
  return {
    failure: {
      _attr: {
        message: shortMessage
      },
      _cdata: filteredMessage
    }
  }
}
