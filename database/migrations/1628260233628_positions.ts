import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Positions extends BaseSchema {
  protected tableName = 'positions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('company_id').unsigned().notNullable().references('id').inTable('users')
      table.integer('student_id').unsigned().references('id').inTable('users')
      table.integer('type').unsigned().notNullable().references('id').inTable('position_types')
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
