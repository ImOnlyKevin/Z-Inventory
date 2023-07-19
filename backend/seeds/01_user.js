const { pwHash } = require('../helpers')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {
      firstname: 'Kevin',
      lastname: 'Cagle',
      username: 'kevin',
      password: pwHash('test')
    },
  
    {
      firstname: 'Rod',
      lastname: 'Cagle',
      username: 'rod',
      password: pwHash('test')
    }
  ])
};
