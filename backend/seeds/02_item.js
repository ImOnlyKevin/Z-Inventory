/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {
      userid: 2,
      item: 'Chapstick',
      description: 'Wax-based balm for dry lips',
      quantity: 5
    },

    {
      userid: 1,
      item: 'iPhone',
      description: 'iPhone 12 Pro Maxx',
      quantity: 3
    }
  ]);
};
