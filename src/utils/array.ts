export const slice = (arr: any[], len: number): any[][] => {
  let i = 0;
  const tmp: any[][] = [];
  while (i * len < arr.length) {
    tmp.push(arr.slice(i * len, ++i * len));
  }
  return tmp;
};
