function processToken(template, data) {
  data = JSON.parse(data);
  for (let d in data) {
    template = template.replace(`!${d}!`, data[d]);
  }
  return template;
}

const notificationMap = {
  "001": {
    create: (data) => processToken("!MESSAGE!", data),
  },
  "002": {
    create: (data) =>
      processToken(
        "You succesfully purchased !TOKEN! tokens! You can now use them to create new boards",
        data
      ),
  },
  "003": {
    create: (data) =>
      processToken(
        "You succesfully subscribed to !DURATION! of unlimited board creation valid until !UNTIL!! Enjoy!",
        data
      ),
  },
  "004": {
    create: (data) => processToken("Succesful Purchase of !PRODUCT!", data),
  },
  "005": {
    create: (data) =>
      processToken(
        "You succesfully subscribed to !TYPE! valid until !UNTIL!! Enjoy!",
        data
      ),
  },
};

export { notificationMap };
