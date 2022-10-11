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
  CategoryAlreadyExist: 'Category Already Exist',
  EligibilityAlreadyExist: 'Eligibility Already Exist',
  EventDoesNotExist: 'Event Does Not Exist',
  FileEmpty: 'File Empty',
  UploadTypeEmpty: 'Upload Type Empty',
  DataDoesNotExist: 'Data Does Not Exist',
  ImageNotFound: 'Image Not Found',
  DateTimeNotValid: 'Date Is Less Than Date Now',
  CategoryNotFound: 'Category Not Found',
  EligibilityNotFound: 'Eligibility Not Found',
  EventNotVerified: 'Event Is Not Verified Yet',
  DataEmpty: 'Data is empty',
  EOPreconditionNotFound: 'Event Organizer Precondition Not Found',
  AlreadyHaPrecondition: 'Precondition Has Already Exist',
  EOIsVerified: 'Event Organizer is Already Verified',
  EventIsVerified: 'Event is Already Verified',
  NotFound: 'Error Not Found',
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
  GetEvent: 'Success Get Event',
  UploadFile: 'Success Upload File',
  GetAllImages: 'Success Get All Images',
  GetImage: 'Success Get Image',
  UpdateData: 'Success Update Data',
  DeleteData: 'Success Delete Data',
  RegisterEvent: 'Success Register Event',
  Profile: 'Success Load Profile',
  GetAllEO: 'Success Get EO',
  VerifyEO: 'Success Verify EO',
  GetEOPrecondition: 'Success Load EO Precondition',
  CreateEOPrecondition: 'Success Create EO Precondition',
  VerifyEvent: 'Success Verify Event',
  SendReport: 'Success Send Report',
  SendFeedback: 'Success Send Feedback',
  GetAllFeedback: 'Success Get All Feedback',
  CreateComment: 'Success Create Comment',
};

export const ROLE = {
  ADMIN: 1,
  EVENT_ORGANIZER: 2,
  PARTICIPANT: 3,
};

export const DEFAULT_ALLOWED_ROLES = [
  ROLE.ADMIN,
  ROLE.EVENT_ORGANIZER,
  ROLE.PARTICIPANT,
];
export const ADMIN_ALLOWED_ROLES = [ROLE.ADMIN];
export const NON_ADMIN_ALLOWED_ROLES = [ROLE.EVENT_ORGANIZER, ROLE.PARTICIPANT];
export const EO_ALLOWED_ROLES = [ROLE.EVENT_ORGANIZER];
export const PARTICIPANT_ALLOWED_ROLES = [ROLE.PARTICIPANT];

export const CLOUDINARY_FOLDER = {
  EVENT_ORGANIZER: 'eo',
  PARTICIPANT: 'participant',
  EO_PRECONDITION: 'eo-precondition',
  EVENT: 'event',
  EVENT_PRECONDITION: 'event-precondition',
};
