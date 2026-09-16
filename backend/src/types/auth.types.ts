export interface RegisterUserBody {
  userName: string;
  email: string;
  password: string;
  status: string;
}

export interface LoginUserBody {
  email: string;
  password: string;
}
