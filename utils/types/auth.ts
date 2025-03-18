export interface Register {
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface ResetPassword {
  token: string;
  password: string;
}

export interface ForgotPassword {
  email: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateProfile {
  name: string;
  username: string;
  phone: string;
}
