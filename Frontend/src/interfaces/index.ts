export type Role = 'Admin' | 'User';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
}
