import { NextFunction, Request, response, Response } from "express";
import * as contactService from "../services/contactsService";

/**
 * Fetches all the contacts
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const getAllContact = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  contactService
    .getAllContacts()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Fetches a contact with matching id
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const getContactById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  contactService
    .getContactById(+id)
    .then((data) => response.json(data))
    .catch((err) => next(err));
};

/** Fetch a contact with matching name
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const getContactByName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  contactService
    .getContactByName(name)
    .then((data) => response.json(data))
    .catch((err) => next(err));
};

/**
 * Creates a new contact
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const createContact = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, phone, email, address } = req.body;
  const fileString = req.file?.path as string;

  contactService
    .createContact(
      {
        name,
        phone,
        email,
        address,
      },
      fileString
    )
    .then((data) => res.json(data))
    .catch((error) => next(error));
};

/**
 * Updates an existing contact
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const updateContact = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, name, phone, email, address, cloud_public_id } = req.body;
  const fileString = req.file?.path as string;
  contactService
    .updateContact(
      {
        id,
        name,
        phone,
        email,
        address,
        cloud_public_id: cloud_public_id as string,
      },
      fileString
    )
    .then((data) => res.json(data))
    .catch((error) => next(error));
};

/**
 * Deletes the contact
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const deleteContact = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  contactService
    .deleteContact(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
