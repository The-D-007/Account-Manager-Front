export function storeLastRefreshedTime() {
  const now = new Date().getTime();
  localStorage.setItem("lastRefreshed", now);
}
export function isMoreThanTwoHoursPassed() {
  const lastRefreshed = localStorage.getItem("lastRefreshed");
  if (!lastRefreshed) {
    return true;
  }
  const now = new Date().getTime();
  const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;
  return now - lastRefreshed > twoHoursInMilliseconds;
}
