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
};

export const SUCCESS = {
  Login: 'Login Success',
  Register: 'Check email for verification',
  RegisterOrmawa: 'Success create ormawa',
  RefreshToken: 'Success Refresh Token',
  Verification: 'Success Verification Account',
  ForgotPassword: 'Success send reset password request',
  ResetPassword: 'Success Reset Password',
};

export const ROLE = {
  ADMIN: 1,
  EVENT_ORGANIZER: 2,
  PARTICIPANT: 3,
};