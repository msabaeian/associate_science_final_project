import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PositionCategory from 'App/Models/PositionCategory'
import {schema} from '@ioc:Adonis/Core/Validator'
import PositionType from 'App/Models/PositionType'
import User from 'App/Models/User'
import UserRole from 'Contracts/Enums/UserROle'
import Database from '@ioc:Adonis/Lucid/Database'
import Position from 'App/Models/Position'
export default class AdminController {
    public index(ctx: HttpContextContract){
        return ctx.view.render('admin/home')
    }

    /**
     * categories
     */
    public async categoryList(ctx: HttpContextContract){
        const categoeis = await PositionCategory.query().orderBy('id','asc')
        return ctx.view.render('admin/category/list', {categoeis})
    }
    public async categoryShow(ctx: HttpContextContract){
        const isNew = ctx.params.id === "new"
        const category = isNew ? null : await PositionCategory.query().where('id',+ctx.params.id).first()
        if(!category && !isNew){
            return ctx.response.redirect().back()
        }

        return ctx.view.render('admin/category/index', {category})
    }
    public async categoryStore(ctx: HttpContextContract){
        const validationSchema = schema.create({
            name: schema.string()
        })
        const validate = await ctx.request.validate({ 
            schema: validationSchema
        })

        const isNew = ctx.params.id === "new"
        if(isNew){
            await PositionCategory.create({
                name: validate.name
            })
            ctx.session.flash('success', 'با موفقیت ایجاد شد')
            return ctx.response.redirect().toRoute('AdminController.categoryList')
        }
        const category = await PositionCategory.query().where('id',+ctx.params.id).first()
        if(category){
            await category.merge({
                name: validate.name
            }).save()
            ctx.session.flash('success', 'با موفقیت بروزرسانی شد')
            return ctx.response.redirect().toRoute('AdminController.categoryList')
        }
        return ctx.response.redirect().back()
    }

    /**
     * categories
     */
    public async typeList(ctx: HttpContextContract){
        const types = await PositionType.query().orderBy('id','asc')
        return ctx.view.render('admin/type/list', {types})
    }
    public async typeShow(ctx: HttpContextContract){
        const isNew = ctx.params.id === "new"
        const type = isNew ? null : await PositionType.query().where('id',+ctx.params.id).first()
        if(!type && !isNew){
            return ctx.response.redirect().back()
        }

        return ctx.view.render('admin/type/index', {type})
    }
    public async typeStore(ctx: HttpContextContract){
        const validationSchema = schema.create({
            name: schema.string()
        })
        const validate = await ctx.request.validate({ 
            schema: validationSchema
        })

        const isNew = ctx.params.id === "new"
        if(isNew){
            await PositionType.create({
                name: validate.name
            })
            ctx.session.flash('success', 'با موفقیت ایجاد شد')
            return ctx.response.redirect().toRoute('AdminController.typeList')
        }
        const category = await PositionType.query().where('id',+ctx.params.id).first()
        if(category){
            await category.merge({
                name: validate.name
            }).save()
            ctx.session.flash('success', 'با موفقیت بروزرسانی شد')
            return ctx.response.redirect().toRoute('AdminController.typeList')
        }
        return ctx.response.redirect().back()
    }

    /**
     * stats
     */
    public async stats(ctx: HttpContextContract){
        const students = await Database.from('users').count('* as total').where('role', UserRole.STUDENT)
        const companies = await Database.from('users').count('* as total').where('role', UserRole.COMPANY)
        const types = await PositionType.query().withCount("positions")
        const categories = await PositionCategory.query().withCount("positions")
        const openPositions = await Database.from('positions').count('* as total').whereNull('student_id')
        const closedPositions = await Database.from('positions').count('* as total').whereNotNull('student_id')
        return ctx.view.render('admin/stats', {
            students: students[0].total, 
            companies: companies[0].total,
            openPositions: openPositions[0].total,
            closedPositions: closedPositions[0].total,
            types: types,
            categories
        })
    }
}
