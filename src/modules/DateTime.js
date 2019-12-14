
// use this function when you are creating your date/timestamp to POST to the API
export function createDateTimeToISO() {
  const newDate = new Date()
  return newDate.toISOString()
}

// use this function when you are converting the API ISO format back to a Date object
// you can then use `.toLocaleString()' or other methods to convert it to a usable display format
export function convertDateTimeFromISO(date) {
  return new Date(date)
}

// to reverse this use sortElementsByDate(JSON.parse(data), "timestamp").reverse())
export function sortElementsByDate(entriesArr, dbTimeKeyString){
  const sortedEntries = entriesArr.sort((a, b) => {
      return new Date(a[dbTimeKeyString]) - new Date(b[dbTimeKeyString]);
    });
  return sortedEntries
}