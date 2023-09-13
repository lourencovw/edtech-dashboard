import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'

export default class StudentsController {
  public async index({ }: HttpContextContract) {
    return await Student.query().preload('courses')
  }

  public async store({ request }: HttpContextContract) {
    const { name, courseIds } = request.body()
    const student = await Student.create({ name });

    return await student.related('courses').attach(courseIds);
  }

  public async show({ request }: HttpContextContract) {
    const id = request.param('id')
    return await Student.query().where('id',id).preload('courses').firstOrFail()
  }

  public async update({ request }: HttpContextContract) {
    const id = request.param('id')
    const { name, courseIds } = request.body()
    const student = await Student.findOrFail(id)
    
    await student.related('courses').sync(courseIds)

    student.name = name
    return await student.save()
  }

  public async destroy({ request }: HttpContextContract) {
    const student = await Student.findOrFail(request.param('id'))
    return await student.delete()
  }
}
