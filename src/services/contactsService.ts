import {
  Contact,
  ContactBeforeUpload,
  ContactToUpdate,
} from "../domain/Contact";
import Succes from "../domain/Success";
import logger from "../misc/logger";
import ContactsModel from "../models/ContactsModel";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const getAllContacts = async (): Promise<Succes<Contact>> => {
  logger.info("Getting all contacts!!");

  // Fetches all the contacts from the database
  const allContacts = await ContactsModel.getAllContacts();

  return {
    data: allContacts,
    message: "Successfully fetched all contacts!!",
  };
};

export const getContactById = async (id: number): Promise<Succes<Contact>> => {
  logger.info("Getting contact by id!!");

  // Fetches the contact matching the provided id
  const contact = await ContactsModel.getContactById(id);

  return {
    data: contact,
    message: "Successfully fetched contact by id!!",
  };
};

export const getContactByName = async (
  name: string
): Promise<Succes<Contact>> => {
  logger.info("Getting contact by id!!");

  // Fetches the contact with the matching name
  const contact = await ContactsModel.getContactByName(name);

  return {
    data: contact,
    message: "Successfully fetched contact by id!!",
  };
};

export const createContact = async (
  contact: ContactBeforeUpload,
  filePath: string
): Promise<Succes<Contact>> => {
  logger.info("Creating a new contact!!");

  try {
    // checks if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error("File not found!!");
    }

    // uploads the image to cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      upload_preset: "contact-manager",
      use_filename: true,
    });

    // Delets the file from the server
    fs.unlinkSync(filePath);

    // Create a new contact on the database
    const newContact = await ContactsModel.createContact({
      ...contact,
      photograph: result.url,
      cloud_public_id: result.public_id,
    });

    return {
      data: newContact,
      message: "Successfully created a contact",
    };
  } catch (error) {
    // Logs the error
    logger.error(error);

    // Deletes the file from the server
    fs.unlinkSync(filePath);

    return {
      message: "Could not create the contact!!",
    };
  }
};

export const updateContact = async (
  contact: ContactToUpdate,
  filePath: string
): Promise<Succes<Contact>> => {
  logger.info("Getting contact by id!!");

  try {
    // checks if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error("File not found!!");
    }

    // uploads the image to cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      upload_preset: "contact-manager",
      use_filename: true,
      public_id: contact.cloud_public_id,
      invalidate: true,
    });

    // Delets the file from the server
    fs.unlinkSync(filePath);

    // Create a new contact on the database
    const updatedContact = await ContactsModel.updateContact({
      ...contact,
      photograph: result.url,
      cloud_public_id: result.public_id,
    });

    return {
      data: updatedContact,
      message: "Successfully updated a contact",
    };
  } catch (error) {
    // Logs the error
    logger.error(error);

    // Deletes the file from the server
    fs.unlinkSync(filePath);

    return {
      message: "Could not update the contact!!",
    };
  }
};

export const deleteContact = async (id: number): Promise<Succes<Contact>> => {
  logger.info("Deleting contact!!");

  // Gets the contact from id
  const contact = await ContactsModel.getContactById(id);

  // Deletes the image from the cloud
  await cloudinary.uploader.destroy(contact.cloud_public_id, (result: any) => {
    logger.info(result);
  });

  // Deletes the contact from the database
  await ContactsModel.deleteContact(id);

  return {
    message: "Successfully deleted contact!!",
  };
};
