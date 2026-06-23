export interface Tag {
  _id: string;

  name: string;

  color: string;

  createdBy: {
    _id: string;
    name: string;
    email: string;
  };

  createdAt: string;

  updatedAt: string;
}
