export function setHashMap(hashMap: any, key: string, index: number) {
  const copyHash = Object.assign({}, hashMap);

  if (copyHash[key]) {
    copyHash[key].push(index);
  } else {
    copyHash[key] = [index];
  }

  return copyHash;
}