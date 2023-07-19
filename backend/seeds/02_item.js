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
      item: 'Armchair',
      description: 'Super comfortable. Well-used.',
      quantity: 3
    },
    {
      userid: 1,
      item: 'Laptop',
      description: '2018 MacBook Pro',
      quantity: 1
    },
    {
      userid: 1,
      item: 'Toaster',
      description: 'Great for taking baths',
      quantity: 7
    },
    {
      userid: 1,
      item: 'Rope',
      description: "Perfect for hangin' around",
      quantity: 11
    },
    {
      userid: 1,
      item: 'iPhone',
      description: 'iPhone 12 Pro Maxx',
      quantity: 3
    }
  ]);
};
