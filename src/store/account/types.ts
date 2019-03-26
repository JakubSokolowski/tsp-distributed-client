export type User = {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  id: number,
  deleting?: boolean,
};

export type AccountState = {
  user?: User;
  status: any;
};

