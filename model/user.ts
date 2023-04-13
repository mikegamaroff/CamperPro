import { Document } from "./model";

export interface User extends Document {
  _id?: string;
  type: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  created_at?: string;
  updated_at?: string;
}
export const EmptyNewUser: User = {
  _id: "",
  type: "",
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  phone_number: "",
  created_at: "",
  updated_at: "",
  _rev: "",
};
export const EmptyUser: User = EmptyNewUser;
