// Sorts an array of objects by a specified property using localeCompare - DESCENDING
const sortByName = (arr, compProp, lang) => {
  return arr.sort((a, b) => a[compProp].localeCompare(b[compProp], lang));
};
// Sorts an array of objects by a specified property - DESCENDING (for dates)
const sortByDate = (arr, compProp) => {
  return arr.sort((a, b) => b[compProp] - a[compProp]);
};
// Main sort function that delegates to specific sort methods
const sort = (
  sortBy = "name-a-z" | "date-newest" | "name-z-a" | "date-oldest",
  { arr, compProp, lang },
) => {
  let sortedArr = [...arr];
  if (sortBy === "name-a-z") sortedArr = sortByName(arr, compProp, lang);
  if (sortBy === "date-newest") sortedArr = sortByDate(arr, compProp);
  if (sortBy === "name-z-a")
    sortedArr = sortByName(arr, compProp, lang).reverse();
  if (sortBy === "date-oldest") sortedArr = sortByDate(arr, compProp).reverse();
  return sortedArr;
};

// SEARCHING
const searchResult = (arr, input, prop) => {
  return arr.filter((item) =>
    item[prop].trim().toLowerCase().includes(input.trim().toLowerCase()),
  );
};

// EXPORTING UTILITIES OBJECT
export const utils = { sort, searchResult };
