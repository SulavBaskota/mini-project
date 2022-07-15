const generatePassword = (letters = 5, numbers = 3, either = 2) => {
  var chars = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    "0123456789",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  ];

  return [letters, numbers, either]
    .map((len, i) => {
      return Array(len)
        .fill(chars[i])
        .map(function (x) {
          return x[Math.floor(Math.random() * x.length)];
        })
        .join("");
    })
    .concat()
    .join("")
    .split("")
    .sort(() => {
      return 0.5 - Math.random();
    })
    .join("");
};

export { generatePassword };
