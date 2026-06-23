export interface Contact {
  _id: string;

  name: string;

  phone: string;

  email?: string;

  profilePicture?: string | null;

  assignedTo?: string | null;

  tags?: string[];

  createdAt: string;

  updatedAt: string;
}
