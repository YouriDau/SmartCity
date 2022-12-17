export function errorMessage(statusCode, errorMessage, subject) {
  let message = "Error, ";
  console.log(statusCode);
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
      message += "retry later, there is an error with the server";
      break;
  }
  return message;
}
