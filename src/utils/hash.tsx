export function setHashMap(hashMap: any, key: string, index: number) {
  const copyHash = Object.assign({}, hashMap);

  if (copyHash[key]) {
    copyHash[key].push(index);
  } else {
    copyHash[key] = [index];
  }

  return copyHash;
}

export function addIndexes(lookupTable: any, value: string, indexes: number[]) {
  if (lookupTable[value]) {
    indexes = indexes.concat(lookupTable[value]);
  }

  return indexes;
}