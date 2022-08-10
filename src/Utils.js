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

const timeSince = (date) => {
  if (typeof date !== "object") {
    date = new Date(date);
  }

  var seconds = Math.floor((new Date() - date) / 1000);
  var intervalType;

  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = "year";
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = "month";
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = "day";
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += "s";
  }

  return interval + " " + intervalType + " ago";
};

const uploadImage = async (imgData) => {
  const res = await fetch(
    "https://api.cloudinary.com/v1_1/readhub/image/upload",
    {
      method: "POST",
      body: imgData,
    }
  );

  return res;
};

const getRequestOptions = (requestData, requestType) => {
  return {
    method: requestType,
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export {
  generatePassword,
  timeSince,
  uploadImage,
  getRequestOptions,
  passwordRegex,
  emailRegex,
};
