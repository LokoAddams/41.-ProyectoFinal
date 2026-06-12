export type Role = 'Admin' | 'User';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}
