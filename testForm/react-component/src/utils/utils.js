export const errorMessage = (statusCode, errorMessage, subject) => {
  let message = "Error, ";
  switch (statusCode) {
    case 400:
      message += errorMessage;
      break;
    case 401:
      message += "authorization needed!";
      break;
    case 403:
      message += "you don't have permissions to do this!";
      break;
    case 404:
      message += `${subject} not found!`;
      break;
    case 409:
      message += errorMessage;
      break;
    case 500:
      message += "something went wrong, retry later";
      break;
  }
  return message;
};

export const callWithRetry = async (nbTry = 0, fn, args) => {
  try {
    return await fn(args);
  } catch (e) {
    console.log(e);

    if (nbTry > 3) {
      throw Error("Error, something went wrong");
    }
    setTimeout(() => {
      callWithRetry(nbTry + 1, fn, args);
    }, 10 ** nbTry);
  }
};
