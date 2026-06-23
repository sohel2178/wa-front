export interface User {
  _id: string;

  name: string;

  email: string;

  role: "admin" | "employee";

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}
