/**
 * Creates a skipped XML element with a message attribute
 * @param message Optional message for the skipped element (defaults to empty string)
 * @returns XML structure for skipped element with mandatory message attribute
 */
export const skipped = (message?: string): any => {
  return {
    skipped: {
      _attr: {
        message: message ?? ''
      }
    }
  };
};
