export const validateAadhaar = (aadhaar) => {
  return /^\d{12}$/.test(aadhaar);
};

export const validateMobile = (mobile) => {
  return /^[6-9]\d{9}$/.test(mobile);
};

export const validatePincode = (pincode) => {
  return /^\d{6}$/.test(pincode);
};
