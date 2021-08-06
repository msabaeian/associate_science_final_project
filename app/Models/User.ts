import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import UserRole from 'Contracts/Enums/UserROle'
import Position from './Position'
import Apply from './Apply'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public name: string

  @column()
  public phone: string

  @column()
  public address: string

  @column()
  public image: string

  @column()
  public role: UserRole

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Position)
  public positions: HasMany<typeof Position>

  @hasMany(() => Position)
  public approvedPositions: HasMany<typeof Position>

  @manyToMany(() => Apply)
  public applies: ManyToMany<typeof Apply>

  @beforeSave()
  public static async hashPassword(user: User){
    if(user.$dirty.password){
      user.password = await Hash.make(user.password)
    }
  }
}
