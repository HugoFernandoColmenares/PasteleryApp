export interface UserLoginRequestDto {
  email: string;
  password: string;
}

export interface UserRegistrationRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserForggotPasswordRequestDto {
  email: string;
}

export interface ResetPasswordRequestDto {
  email: string;
  token: string;
  newPassword: string;
}

export interface ConfirmEmailDto {
  userId: string;
  token: string;
}

export interface AuthResult {
  token: string;
  result: boolean;
  errors: string[];
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
