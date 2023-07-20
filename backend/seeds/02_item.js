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
      userid: 2,
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
      userid: 2,
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
    },
    {
      userid: 2,
      item: 'Suitcase',
      description: 'Sturdy handle, one broken wheel',
      quantity: 1
    },
    {
      userid: 1,
      item: '3br 2br House',
      description: "Bet you're surprised this is on here",
      quantity: 99
    },
    {
      userid: 2,
      item: 'Apple Watch',
      description: 'Late 2018 model',
      quantity: 9
    },
    {
      userid: 1,
      item: 'Tesla Cybertruck',
      description: "Never actually going to be in production",
      quantity: 1
    },
    {
      userid: 1,
      item: 'T-Shirt',
      description: 'Stolen off a mannequin',
      quantity: 1
    }
  ]);
};
