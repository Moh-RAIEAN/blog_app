/* eslint-disable @typescript-eslint/no-explicit-any */
export default function pickValuesFromArray<
  TSource extends readonly any[],
  TValues extends TSource[number],
>(sourceArray: TSource, valuesToPick: readonly TValues[]): TValues[] {
  return sourceArray.filter((item) => valuesToPick.includes(item));
}
