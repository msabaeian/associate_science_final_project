import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import {schema,rules,ParsedTypedSchema} from '@ioc:Adonis/Core/Validator'
import { uploadToLiaraBucket } from 'App/Helpers/UploadToLiara'
import UserRole from 'Contracts/Enums/UserROle'
export default class UsersController {

    public loginShow(ctx: HttpContextContract){
        return ctx.view.render('login')
    }

    public async login(ctx: HttpContextContract){
        const {email, password} = ctx.request.all()
        try{
            await ctx.auth.attempt(email, password, true)
            return ctx.response.redirect('/')
        }catch(error){
            ctx.session.flash('error', 'نام کاربری و یا کلمه عبور وارد شده اشتباه است')
            return ctx.response.redirect('back')
        }
    }

    public async logout(ctx: HttpContextContract){
        await ctx.auth.logout()
        return ctx.response.redirect('/')
    }

    public studentRegister(ctx: HttpContextContract){
        return ctx.view.render('register')
    }

    public async registerUser(ctx: HttpContextContract, validationSchema: ParsedTypedSchema<any>, userRole: UserRole = UserRole.STUDENT) {
        const validate = await ctx.request.validate({ 
            schema: validationSchema
        }) 
        const imageUrl = await uploadToLiaraBucket(validate.image)
        await User.create({
            ...validate,
            role: userRole,
            image: imageUrl
        })
        return this.login(ctx)
    }

    public async studentStore(ctx: HttpContextContract){
        const validationSchema = schema.create({
            email: schema.string({trim: true}, [
                rules.email(),
                rules.unique({table: 'users', column: 'email'})
            ]),
            password: schema.string({}, [
                rules.confirmed()
            ]),
            phone: schema.string(),
            image: schema.file({
                extnames: ['jpg', 'png']
            }),
            name: schema.string(),
        })
        return this.registerUser(ctx, validationSchema)
    }

    public async companyRegister(ctx: HttpContextContract){
        return ctx.view.render('register_company')
    }

    public async companyStore(ctx: HttpContextContract){
        const validationSchema = schema.create({
            email: schema.string({trim: true}, [
                rules.email(),
                rules.unique({table: 'users', column: 'email'})
            ]),
            password: schema.string({}, [
                rules.confirmed()
            ]),
            phone: schema.string(),
            address: schema.string(),
            image: schema.file({
                extnames: ['jpg', 'png']
            }),
            name: schema.string(),
        })
        return this.registerUser(ctx, validationSchema, UserRole.COMPANY)
    }


}