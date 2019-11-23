export function formatDate(date) {
  console.log(date);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  let dateParsed = new Date(date);
  return dateParsed.toLocaleDateString("hu-HU", options);
}
