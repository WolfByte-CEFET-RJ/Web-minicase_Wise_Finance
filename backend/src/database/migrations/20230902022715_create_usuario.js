/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('Usuario', function (table) {
      table.increments('ID').primary();
      table.string('Username').notNullable();
      table.string('Email', 255).notNullable();
      table.string('Nome').notNullable();
      table.string('Senha').notNullable();
      table.timestamp('Data_Registro').defaultTo(knex.fn.now());
      table.decimal('Saldo_Geral', 10, 2).defaultTo(0);
      table.decimal('Desp_Var_Total', 10, 2).defaultTo(0);
      table.decimal('Desp_Fixa_Total', 10, 2).defaultTo(0);
      table.decimal('Rec_Var_Total', 10, 2).defaultTo(0);
      table.decimal('Rec_Fixa_Total', 10, 2).defaultTo(0);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable("Usuario")
};
