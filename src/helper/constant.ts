export const ERROR = {
  WrongEmailorPassword: 'Email or Password Incorrect',
  PasswordNotMatch: 'Password not match',
  EmailRegistered: 'Email already registered',
  PhoneNumberRegistered: 'Phone number already registered',
  InternalServer: 'Internal Server Error',
  RefreshTokenNotFound: 'Refresh Token Not Found',
  UserNotFound: 'User does not exist',
  LoginRequired: 'Login Required',
  TokenNotExist: 'Token not exist',
  VerificationFailed: 'Verification Failed',
  NotAllowed: 'NotAllowed',
  EONotVerified: 'Account Is Not Verified',
  EmailDoesNotExist: 'Email does not exist',
  AlreadySendResetPasswordRequest: 'Already send reset password request',
  TokenExpired: 'Token already expired',
  ResourceNotAllowed: 'Resource Not Allowed',
  CategoryOrEligibilityDoesNotExist: 'Category or Eligibility Does Not Exist',
  CategoryAlreadyExist: 'Category Already Exist',
  EligibilityAlreadyExist: 'Eligibility Already Exist',
};

export const SUCCESS = {
  Login: 'Login Success',
  Register: 'Check email for verification',
  RegisterOrmawa: 'Success create ormawa',
  RefreshToken: 'Success Refresh Token',
  Verification: 'Success Verification Account',
  ForgotPassword: 'Success send reset password request',
  ResetPassword: 'Success Reset Password',
  CreateEvent: 'Success Create Event',
  CreateCategory: 'Success Create Category',
  CreateEligibility: 'Success Create Eligibility',
  GetAllEvents: 'Success Get All Events',
  GetAllCategories: 'Success Get All Categories',
  GetAllEligibility: 'Success Get All Eligibility',
};

export const ROLE = {
  ADMIN: 1,
  EVENT_ORGANIZER: 2,
  PARTICIPANT: 3,
};
