/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('Balanco_Mensal', function (table) {
        table.increments('ID').primary();
        table.integer('ID_Usuario').unsigned().references('ID').inTable('Usuario');
        table.decimal('Total_Receitas', 10, 2).notNullable();
        table.decimal('Total_Despesas', 10, 2).notNullable();
        table.integer('Mes').notNullable();
        table.integer('Ano').notNullable();
        table.decimal('Valor_Balanco', 10, 2).notNullable();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable("Balanco_Mensal")
};
