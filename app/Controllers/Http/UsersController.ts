import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema,rules} from '@ioc:Adonis/Core/Validator'
import { uploadToLiaraBucket } from 'App/Helpers/UploadToLiara'
import User from 'App/Models/User'
import UserRole from 'Contracts/Enums/UserROle'

export default class UsersController {
    public async index(ctx: HttpContextContract){
        return ctx.view.render('profile')
    }

    public async update(ctx: HttpContextContract){
        const validationSchema = schema.create({
            phone: schema.string(),
            image: schema.file.optional({
                extnames: ['jpg', 'png']
            }),
            name: schema.string(),
            ...(ctx.auth.user?.role === UserRole.COMPANY ? {address: schema.string()} : {})
        })

        const validate = await ctx.request.validate({ 
            schema: validationSchema
        }) 

        let image = ''
        if(validate.image){
            image = await uploadToLiaraBucket(validate.image)
        }
        
        const user = await User.find(ctx.auth.user?.id)
        await user?.merge({
            name: validate.name,
            phone: validate.phone,
            ...(validate.address ? {address: validate.address as string} : {}),
            ...(image ? {image} : {}),
        }).save()
        ctx.session.flash('success', 'اطلاعات کاربری با موفقیت بروزرسانی شد')
        return ctx.response.redirect().back()
    }

    public async updatePassword(ctx: HttpContextContract){
        const validationSchema = schema.create({
            password: schema.string({}, [
                rules.confirmed()
            ])
        })
        const validate = await ctx.request.validate({ 
            schema: validationSchema
        }) 
        const user = await User.find(ctx.auth.user?.id)
        await user?.merge({
            password: validate.password
        }).save()
        ctx.session.flash('success', 'کلمه عبور با موفقیت بروزرسانی شد')
        return ctx.response.redirect().back()
    }

}