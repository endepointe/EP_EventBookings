// decides whether the next button is disabled in UserForm's child components
// returns true or false
export const checkInput = (step, data) => {
  console.log(step, data);
  switch (step) {
    case 0:
      /*
      firstName: '',
      lastName: '',
      phoneNumber: '',
      militaryBranch: '',
      militaryStatus: '',
      */
      if (data.firstName.length > 0 &&
          data.lastName.length > 0 &&
          data.phoneNumber.length > 9 &&
          data.militaryBranch.length > 0 &&
          data.militaryStatus.length > 0) {
          return false;
      }
    break;
    case 1:
      /*
        companyName: '', 
        websiteUrl: '',
        description: '',
      */
      if (data.companyName.length > 0 &&
          data.websiteUrl.length > 4 &&
          data.description.length > 10 ) {
          return false;
      }
    break;
    case 2: 
      return false;
    case 3:
    break;
    case 4:
    break;
    case 5:
    break;
    default:
    break;
  }

  return true;
}