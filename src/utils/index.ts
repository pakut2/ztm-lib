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

export const calcDist = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371e3;
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};
