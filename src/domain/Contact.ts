export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  photograph: string;
  cloud_public_id: string;
}

export type ContactToCreate = Omit<Contact, "id">;

export type ContactToUpdate = Omit<Contact, "photograph">;

export type ContactBeforeUpload = Omit<
  Contact,
  "id" | "photograph" | "cloud_public_id"
>;
