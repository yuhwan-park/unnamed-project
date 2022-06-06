export interface IFormData {
  email: string;
  password: string;
  nickname?: string;
}

export interface IUpdatePasswordFormData {
  email: string;
}

export interface ITaskFormData {
  title: string;
}

export interface IUserState {
  displayName: string | null;
  uid: string;
  photoURL: string | null;
  email: string | null;
}
