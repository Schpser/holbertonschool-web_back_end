export default function appendToEachArrayValue(array, appendString) {
  const newArray = [];
  array.forEach((value) => {
    newArray.push(appendString + value);
  });
  return newArray;
}
