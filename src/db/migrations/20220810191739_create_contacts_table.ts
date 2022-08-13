import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("contacts", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("phone").notNullable();
    table.string("photograph").notNullable();
    table.string("email");
    table.string("address");
    table.string("cloud_public_id");
    table.boolean("is_favourite").defaultTo(false);
    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("user_account")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("contacts");
}
