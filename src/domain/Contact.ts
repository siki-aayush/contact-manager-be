export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  photograph: string;
  cloud_public_id: string;
  user_id: number;
  is_favourite: boolean;
}

export type ContactToCreate = Omit<Contact, "id">;

export type ContactToUpdate = Omit<Contact, "photograph">;

export type ContactBeforeUpload = Omit<
  Contact,
  "id" | "photograph" | "cloud_public_id"
>;

export type ContactToGet = Omit<Contact, "user_id" | "cloud_public_id">;
