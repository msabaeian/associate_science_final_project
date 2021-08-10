import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PositionCategory from 'App/Models/PositionCategory'
import {schema} from '@ioc:Adonis/Core/Validator'
export default class AdminController {
    public index(ctx: HttpContextContract){
        return ctx.view.render('admin/home')
    }

    /**
     * categories
     */
    public async categoryList(ctx: HttpContextContract){
        const categoeis = await PositionCategory.query().orderBy('id',,'asc')
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
    public typeList(ctx: HttpContextContract){
        return ctx.view.render('admin/home')
    }
    public typeShow(ctx: HttpContextContract){
        return ctx.view.render('admin/home')
    }
    public typeStore(ctx: HttpContextContract){
        return ctx.view.render('admin/home')
    }

    /**
     * stats
     */
    public stats(ctx: HttpContextContract){
        return ctx.view.render('admin/home')
    }
}
