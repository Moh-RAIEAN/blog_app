const handleNestedData = (
  data: Record<string, unknown>,
  fieldName: string,
): Record<string, unknown> => {
  const modifiedData: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    modifiedData[`${fieldName}.${key}`] = value;
  }
  return modifiedData;
};

export default handleNestedData;
