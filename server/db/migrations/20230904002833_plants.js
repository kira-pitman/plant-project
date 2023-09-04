// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
export function up(knex) {
  return knex.schema.createTable('plants', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('height')
    table.string('location')
    table.string('facts')
    table.string('image')
  })
}

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
export function down(knex) {
  return knex.schema.dropTableIfExists('plants')
}
