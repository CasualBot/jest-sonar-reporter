import { stripVTControlCharacters } from 'util';
import type { XmlLeaf } from '../../types';

export const failure = (message: string): XmlLeaf => {
  const filteredMessage = stripVTControlCharacters(message);
  const shortMessage = filteredMessage.split('\n', 1)[0];
  return {
    failure: {
      _attr: {
        message: shortMessage
      },
      _cdata: filteredMessage
    }
  }
}
