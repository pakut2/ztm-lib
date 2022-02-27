export const partialMatch = <T>(input: Array<T>, obj: Partial<T>): Array<T> => {
  return input.filter((el) => {
    let match;

    for (const [key, value] of Object.entries(obj)) {
      match = el[key as keyof T] === value;

      if (!match) break;
    }

    return match;
  });
};
