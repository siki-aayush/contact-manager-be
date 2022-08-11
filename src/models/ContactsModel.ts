import db from "../db/db";
import { Contact, ContactToCreate } from "../domain/Contact";

class ContactsModel {
  public static table = "contacts";

  public static async getAllContacts() {
    const allContacts = await db(ContactsModel.table).select(
      "id",
      "name",
      "phone",
      "photograph",
      "email",
      "address",
      "cloud_public_id"
    );

    return allContacts;
  }

  public static async getContactById(id: number) {
    const contacts = await db(ContactsModel.table).where({ id }).first();

    return contacts;
  }

  public static async getContactByName(name: string) {
    const contact = await db(ContactsModel.table).where({ name }).first();

    return contact;
  }

  public static async createContact(contact: ContactToCreate) {
    const newContact = await db(ContactsModel.table)
      .insert(contact)
      .returning("*");

    return newContact;
  }

  public static async updateContact(contact: Contact) {
    const updatedContact = await db(ContactsModel.table)
      .where({ id: contact.id })
      .update(contact)
      .returning("*");

    return updatedContact;
  }

  public static async deleteContact(id: number) {
    await db(ContactsModel.table).where({ id }).del();

    return;
  }
}

export default ContactsModel;
