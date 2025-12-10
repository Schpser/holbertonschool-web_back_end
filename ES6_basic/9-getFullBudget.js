import getBudgetObject from './7-getBudgetObject.js';

export default function appendToEachArrayValue(array, appendString) {
  const newArray = [];
  
  for (const value of array) {
    newArray.push(appendString + value);
  }
  
  return newArray;
}
