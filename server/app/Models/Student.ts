import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Course from 'App/Models/Course'


export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @manyToMany(() => Course)
  public courses: ManyToMany<typeof Course>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
