import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Position from 'App/Models/Position'
import PositionType from 'App/Models/PositionType'
import User from 'App/Models/User'
import {schema} from '@ioc:Adonis/Core/Validator'
import PositionCategory from 'App/Models/PositionCategory'

export default class CompaniesController {
    public async all(ctx: HttpContextContract){
        const positions = await Position.query().where('companyId',ctx.auth.user?.id || 0).preload('students')
        return ctx.view.render('company_positions', {positions})
    }

    public async index(ctx: HttpContextContract){
        const position = await Position.query().preload("student").preload("students", (query) => query.preload("student")).where('id', ctx.params.id).first()
        return ctx.view.render('company_position', {position})
    }
    
    public async createShow(ctx: HttpContextContract){
        const types = await PositionType.all()
        const categories = await PositionCategory.all()
        return ctx.view.render('company_add_position', {categories, types})
    }

    public async store(ctx: HttpContextContract){
        const validationSchema = schema.create({
            title: schema.string(),
            description: schema.string(),
            type: schema.number(),
            sex: schema.number(),
            category: schema.number(),
        })

        const validate = await ctx.request.validate({ 
            schema: validationSchema
        })

        await Position.create({
            ...validate,
            companyId: ctx.auth.user?.id
        })

        ctx.session.flash('success', 'با موفقیت ایجاد شد')
        return ctx.response.redirect().toRoute('CompaniesController.all')
    }

    public async selectStudent(ctx: HttpContextContract){
        const position = await Position.query().preload("student").preload("students").where('id', ctx.params.id).first()
        if(position?.studentId) {
            ctx.session.flash('error', 'شما کارجوی این موقعیت را انتخاب کرده‌اید')
            return ctx.response.redirect().back()
        }
        const {student: studentId} = ctx.request.all()
        if(!studentId){
            ctx.session.flash('error', 'لطفا کارجو را انتخاب نمایید')
            return ctx.response.redirect().back()
        }
        const student = await User.find(studentId)
        if(!student){
            ctx.session.flash('error', 'کارجو یافت نشد')
            return ctx.response.redirect().back()
        }
        await position?.merge({studentId}).save()
        ctx.session.flash('success', 'کارجو با موفقیت انتخاب شد.')
        return ctx.response.redirect().back()
    }
}
