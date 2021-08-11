import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DescriptionLongTexts extends BaseSchema {
  protected tableName = 'positions'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.text("description", 'longtext').notNullable().alter()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('description').notNullable().alter()
    })
  }
}
