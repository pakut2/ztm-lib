export const partialMatch = <T>(input: T[], obj: Partial<T>): T[] => {
  return input.filter((el) => {
    let match;

    for (const [key, value] of Object.entries(obj)) {
      match = el[key as keyof T] === value;

      if (!match) break;
    }

    return match;
  });
};
