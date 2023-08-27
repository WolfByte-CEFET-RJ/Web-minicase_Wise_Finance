/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('Usuario', function (table) {
      table.increments('ID').primary();
      table.string('Username').notNullable();
      table.string('Email').notNullable().unique();
      table.string('Nome').notNullable();
      table.string('Senha').notNullable();
      table.timestamp('Data_Registro').defaultTo(knex.fn.now());
      table.decimal('Saldo_Geral', 10, 2).defaultTo(0);
      table.decimal('Desp_Var_Total', 10, 2).defaultTo(0);
      table.decimal('Desp_Fixa_Total', 10, 2).defaultTo(0);
      table.decimal('Rec_Var_Total', 10, 2).defaultTo(0);
      table.decimal('Rec_Fixa_Total', 10, 2).defaultTo(0);
    })
    .createTable('Despesa_Fixa', function (table) {
      table.increments('ID').primary();
      table.integer('ID_Usuario').unsigned().references('ID').inTable('Usuario');
      table.string('Nome').notNullable();
      table.decimal('Valor', 10, 2).notNullable();
      table.date('Data').notNullable();
      table.text('Descricao');
    })
    .createTable('Despesa_Variavel', function (table) {
        table.increments('ID').primary();
        table.integer('ID_Usuario').unsigned().references('ID').inTable('Usuario');
        table.string('Nome').notNullable();
        table.decimal('Valor', 10, 2).notNullable();
        table.date('Data').notNullable();
        table.text('Descricao');
      })
      .createTable('Receita_Fixa', function (table) {
        table.increments('ID').primary();
        table.integer('ID_Usuario').unsigned().references('ID').inTable('Usuario');
        table.string('Nome').notNullable();
        table.decimal('Valor', 10, 2).notNullable();
        table.date('Data').notNullable();
        table.text('Descricao');
      })
      .createTable('Receita_Variavel', function (table) {
        table.increments('ID').primary();
        table.integer('ID_Usuario').unsigned().references('ID').inTable('Usuario');
        table.string('Nome').notNullable();
        table.decimal('Valor', 10, 2).notNullable();
        table.date('Data').notNullable();
        table.text('Descricao');
      })
      .createTable('Limite_Mensal', function (table) {
        table.increments('ID').primary();
        table.integer('ID_Usuario').unsigned().references('ID').inTable('Usuario');
        table.decimal('Valor_Limite', 10, 2).notNullable();
        table.integer('Mes_Definido').notNullable();
        table.integer('Ano_Definido').notNullable();
      })
      .createTable('Balanco_Mensal', function (table) {
        table.increments('ID').primary();
        table.integer('ID_Usuario').unsigned().references('ID').inTable('Usuario');
        table.decimal('Total_Receitas', 10, 2).notNullable();
        table.decimal('Total_Despesas', 10, 2).notNullable();
        table.integer('Mes').notNullable();
        table.integer('Ano').notNullable();
        table.decimal('Valor_Balanco', 10, 2).notNullable();
      })
      .createTable('Relatorio_Mensal', function (table) {
        table.increments('ID').primary();
        table.integer('ID_Usuario').unsigned().references('ID').inTable('Usuario');
        table.text('Link_Relatorio');
        table.integer('Mes').notNullable();
        table.integer('Ano').notNullable();
        table.timestamp('Data_Criacao').defaultTo(knex.fn.now()); 
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable("Usuario")
    .dropTable("Despesa_Fixa")
    .dropTable("Despesa_Variavel")
    .dropTable("Receita_Fixa")
    .dropTable("Receita_Variavel")
    .dropTable("Limite_Mensal")
    .dropTable("Balanco_Mensal")
    .dropTable("Relatorio_Mensal")
};
