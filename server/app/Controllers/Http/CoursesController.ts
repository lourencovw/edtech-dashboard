import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from 'App/Models/Course'

export default class CoursesController {
  public async index({ }: HttpContextContract) {
    return await Course.all()
  }

  public async store({ request }: HttpContextContract) {
    const { name } = request.body()
    return await Course.create({ name })
  }

  public async update({ request }: HttpContextContract) {    
    const id = request.param('id')
    const { name } = request.body()
    const course = await Course.findOrFail(id)
    course.name = name
    return await course.save()
  }

  public async destroy({ request }: HttpContextContract) {
    const course = await Course.findOrFail(request.param('id'))
    return await course.delete()
  }
}
