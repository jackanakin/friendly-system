const DailyStatsHourSorter = function(a, b) {
  if (a.hour < b.hour) {
    return -1;
  }
  if (a.hour > b.hour) {
    return 1;
  }
  return 0;
};

export default DailyStatsHourSorter;
