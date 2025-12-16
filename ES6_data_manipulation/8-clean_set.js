export default function cleanSet(set, startString) {

  if (startString === '') {
    return '';
  }

  const arrayFromSet = Array.from(set);

  const filtered = arrayFromSet
    .filter(value => value.startsWith(startString))
    .map(value => value.slice(startString.length))
    .join('-');

  return filtered;
}
