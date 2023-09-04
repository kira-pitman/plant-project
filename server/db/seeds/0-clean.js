export async function seed(knex) {
  await knex('plants').del()
}
