import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Position from 'App/Models/Position'
import PositionType from 'App/Models/PositionType'
import User from 'App/Models/User'
import {schema,rules} from '@ioc:Adonis/Core/Validator'

export default class CompaniesController {
    public async all(ctx: HttpContextContract){
        const positions = await Position.query().where('companyId',ctx.auth.user?.id || 0).preload('students')
        return ctx.view.render('company_positions', {positions})
    }

    public async index(ctx: HttpContextContract){
        return ctx.view.render('company_position')
    }
    
    public async createShow(ctx: HttpContextContract){
        const position_types = await PositionType.all()
        return ctx.view.render('company_add_position', {position_types})
    }

    public async store(ctx: HttpContextContract){
        const validationSchema = schema.create({
            title: schema.string(),
            description: schema.string(),
            type: schema.number(),
        })

        const validate = await ctx.request.validate({ 
            schema: validationSchema
        })

        await Position.create({
            ...validate,
            companyId: ctx.auth.user?.id,
        })

        ctx.session.flash('success', 'با موفقیت ایجاد شد')
        return ctx.response.redirect().toRoute('CompaniesController.index')
        // return this.login(ctx)
    }
}
