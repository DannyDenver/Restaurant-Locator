export function filterByIndexes(array: any, indexes: number[], indexesTwo: number[] = []) {
    return array.filter((item: any, index: number) => indexes.includes(index) && (indexesTwo.length ? indexesTwo.includes(index) : true));
}