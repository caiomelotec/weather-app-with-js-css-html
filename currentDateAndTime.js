function getCurrentDateAndTime(targetTimeZone) {
  const date = new Date();

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: targetTimeZone,
    hour12: false,
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  };

  localtime.innerText = date.toLocaleString("en-US", options);
}
