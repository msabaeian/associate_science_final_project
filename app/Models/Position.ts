import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Apply from './Apply'

export default class Position extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public company_id: number

  @column()
  public student_id: number | null

  @column()
  public type: number

  @column()
  public title: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User , {
    localKey: 'company_id'
  })
  public company: BelongsTo<typeof User>

  @belongsTo(() => User, {
    localKey: 'student_id'
  })
  public student: BelongsTo<typeof User>

  @manyToMany(() => Apply)
  public students: ManyToMany<typeof Apply>
}
