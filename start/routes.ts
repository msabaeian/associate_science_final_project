/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', ({ view }) => view.render('home'))

Route.group(() => {
  Route.get('/login', 'AuthController.loginShow')
  Route.get('/register', 'AuthController.studentRegister')
  Route.get('/registerCompany', 'AuthController.companyRegister')
  Route.post('/login', 'AuthController.login')
  Route.post('/register', 'AuthController.studentStore')
  Route.post('/registerCompany', 'AuthController.companyStore')
}).middleware('guest')

Route.get('/logout', 'AuthController.logout')

Route.get('/positions', 'PositionsController.all')
Route.get('/position/:id', 'PositionsController.index')
Route.post('/position/:id', 'PositionsController.apply').middleware('auth')

Route.get('/about', 'PositionsController.index')

Route.get('/usercp', 'PositionsController.studentAppliedPositions').middleware('auth')
Route.get('/profile', 'UsersController.index').middleware('auth')
Route.post('/profile', 'UsersController.update').middleware('auth')
Route.post('/profile/password', 'UsersController.updatePassword').middleware('auth')

Route.group(() => {
  Route.get('/positions', 'CompaniesController.all')
  Route.get('/position/create', 'CompaniesController.createShow')
  Route.post('/position/create', 'CompaniesController.store')
  Route.get('/position/:id', 'CompaniesController.index')
  Route.post('/position/:id', 'CompaniesController.selectStudent')
  
}).prefix('/company').middleware('auth')

Route.group(() => {
  Route.get('/', 'AdminController.index')
  Route.get('/categories', 'AdminController.categoryList')
  Route.get('/category/:id', 'AdminController.categoryShow')
  Route.post('/category/:id', 'AdminController.categoryStore')
  Route.get('/types', 'AdminController.typeList')
  Route.get('/types/:id', 'AdminController.typeShow')
  Route.post('/types/create', 'AdminController.typeStore')
  Route.post('/stats', 'AdminController.stats')
}).prefix('/admin').middleware('auth').middleware('admin')