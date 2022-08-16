import { LIMIT_PER_PAGE } from "../constants/common";
import db from "../db/db";
import { Contact, ContactToCreate } from "../domain/Contact";

class ContactsModel {
  public static table = "contacts";

  public static async getAllContacts(id: number, page: number) {
    const offset = (page - 1) * LIMIT_PER_PAGE;
    const allContacts = await db(ContactsModel.table)
      .select(
        "id",
        "name",
        "phone",
        "photograph",
        "email",
        "address",
        "cloud_public_id",
        "is_favourite"
      )
      .where({ user_id: id })
      .orderBy("is_favourite", "desc")
      .orderBy("name", "asc")
      .offset(offset)
      .limit(LIMIT_PER_PAGE);

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

  public static async updateContactFavourite(id: number, isFavourite: boolean) {
    const updatedContact = await db(ContactsModel.table)
      .where({ id })
      .update({ is_favourite: isFavourite })
      .returning("*");

    return updatedContact;
  }

  public static async deleteContact(id: number) {
    await db(ContactsModel.table).where({ id }).del();

    return;
  }
}

export default ContactsModel;
