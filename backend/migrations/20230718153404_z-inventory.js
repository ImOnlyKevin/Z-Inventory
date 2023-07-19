/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return createUserTable(knex)
    .then(createItemTable(knex))
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("item")
    .dropTableIfExists("user");
};

function createUserTable(knex) {
    return knex.schema.hasTable('user').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('user', function (table) {
                table.increments('id').primary()
                table.string('firstname')
                table.string('lastname')
                table.string('username')
                table.string('password') // stretch: encrypt
            })
        }
    })
    
}

function createItemTable(knex) {
    return knex.schema.hasTable('item').then(function(exists) { 
        if (!exists) {
            return knex.schema.createTable('item', function (table) {
                table.increments('id')
                table.integer('userid')
                table.string('item')
                table.text('description')
                table.integer('quantity') 
        
                table.foreign('userid').references('user.id')
            })
        }
    })
}