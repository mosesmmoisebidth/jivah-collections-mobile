export interface Register {
  username: string;
  firstName: string;
  lastName: string;
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
  currentPassword: string;
  newPassword: string;
}

export interface UpdateProfile {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber: string;
  profileImage: any;
}
