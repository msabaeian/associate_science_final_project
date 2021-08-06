import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import UserRole from 'Contracts/Enums/UserROle'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string("email").unique().notNullable()
      table.string("password").notNullable()
      table.string("name").notNullable()
      table.string("phone").notNullable()
      table.string("address").nullable()
      table.string("image").nullable()
      table.integer("role").unsigned().defaultTo(UserRole.STUDENT)
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
