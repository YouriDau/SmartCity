export const validAccount = (pseudo, lastName, firstName, email, password) => {
  let alert = "Please enter your ";
  if (pseudo === "") {
    return (alert += "pseudo ");
  } else {
    if (lastName === "") {
      return (alert += "last name ");
    } else {
      if (firstName === "") {
        return (alert += "first name ");
      } else {
        if (email === "") {
          return (alert += "email ");
        } else {
          if (password === "") {
            return (alert += "password");
          } else {
            return;
          }
        }
      }
    }
  }
};
