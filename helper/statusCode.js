const HttpStatus = {
  OK: {
    code: 200,
    message: 'FETCH SUCCESSFULLY',
  },
  NOT_FOUND: {
    code: 404,
    message: 'NOT FOUND',
  },
  DELETED: {
    code: 204,
    message: 'DELETED SUCCESSFULLY'
  },
  CREATED: {
    code: 201,
    message: 'CREATED SUCCESSFULLY',
  },
  UPDATED: {
    code: 201,
    message: 'UPDATED SUCCESSFULLY',
  },
  UNAUTHORIZED: {
    code: 401,
    message: 'UNAUTHORIZED'
  },
  FORBIDDEN: {
    code: 403,
    message: 'FORBIDDEN'
  },
  BAD_REQUEST: {
    code: 400, message: 'BAD_REQUEST',
  },
  ROUTE_NOT_FOUND: {
    code: 404,
    message: 'ROUTE_NOT_FOUND'
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'INTERNAL_SERVER_ERROR'
  }
};


const CustomMessages = {
  MESSAGE: {
    notStandardPassword: 'Password mush have 1 special character, one uppercase & lower case character, one number and 5 to 12 character length',
    loginSuccess: 'LOGIN SUCCESSFULLY',
    loginInValid: 'LOGIN FAILED',
    inValid: 'INVALID',
    emailPasswordNotFound: 'EMAIL OR PASSWORD NOT FOUND',
    alreadyExist: 'ALREADY EXIST',
    otpSentSuccessfully: 'OTP has been sent successfully',
    otpSendingFailed: 'OTP could not be sent on the povided number',
    accountNotVerified: 'Account has not been verified',
    accountVerifiedSuccessfully: 'Account verified and activated successfully'
  },
}

const EmailSubjects = {
  accountVerification: 'Account Verification Email from 8inNetwork',
}

module.exports = { HttpStatus, CustomMessages, EmailSubjects };