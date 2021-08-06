import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Applies extends BaseSchema {
  protected tableName = 'applies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer("student_id").unsigned().references("id").inTable('users')
      table.integer("position_id").unsigned().references("id").inTable('positions')
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
