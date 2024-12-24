const pick = <T>(obj: T, keys: (keyof T)[]) => {
  const filteredObj: Record<string, unknown> = {};
  keys.forEach((key) => {
    filteredObj[key.toString()] = obj[key];
  });
  return filteredObj;
};

export default pick;
