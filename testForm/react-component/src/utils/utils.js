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
