import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as pactum from 'pactum'
import { AuthDto } from 'auth/dto';
import { EditUserDto } from 'user/dto';
import { CreateBookmarkDto, EditBookmarkDto } from 'bookmark/dto';
describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({//we create module just to import the other moduleAuth<odule 
      imports: [AppModule]
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
    )
    await app.init();
    app.listen(3000);
    prisma = app.get(PrismaService)
    await prisma.cleanDb()
    pactum.request.setBaseUrl('http://localhost:3000')
  });
  afterAll(() => {
    app.close()
  });
  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'je@gmail.com',
      password: '123e'
    }
    describe('Signup', () => {
      it('should throw if email is empty', () => {
        return pactum.spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password
          })
          .expectStatus(400)

      })
      it('should throw if password is empty', () => {
        return pactum.spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email
          })
          .expectStatus(400)

      })
      it('should throw if no body provided', () => {
        return pactum.spec()
          .post('/auth/signup')
          .expectStatus(400)

      })
      it('should signup', () => {
        return pactum.spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)

      })
    }
    )
    describe('Signin', () => {
      // it.todo('should signin')
      it('should throw if email is empty', () => {
        return pactum.spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400)
          

      })
      it('should throw if password is empty', () => {
        return pactum.spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400)

      })
      it('should throw if no body provided', () => {
        return pactum.spec()
          .post('/auth/signin')
          .expectStatus(400)

      })
      it('should signin ', () => {

        return pactum.spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt','access_token')
          //.inspect()
      })

    })
    describe('Signout', () => {
      it.todo('should signout')
    })
  })
  describe('User', () => {
    describe('Get Me', () => { 
      it('should get current user',()=>{
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({Authorization:'Bearer $S{userAt}'})
          .expectStatus(200)
         // .inspect()

      })
    })
    describe('Edit User',()=>{
      it('should edit user',()=>{
         const dto:EditUserDto={
          firstName:'jebbbbbbb',
          email:'jerusalemtina@gmail.com'
         }
         return pactum
          .spec()
         .patch('/users')
         .withHeaders({Authorization:'Bearer $S{userAt}'})
         .withBody(dto)
         .expectStatus(200)
         //.expectBodyContains(dto.firstName)
         //.expectBodyContains(dto.email)
         
         .inspect()
         
      })
    })
    // 
    //     const dto:EditUserDto={
    //       firstName:'jerusalem',
    //       lastName:'Taeme',
    //       email:'jerusalemtina@gmail.com'
    //     }
    //    
    //   })
    // })
  })
  describe('Bookmarks', () => {
    describe('Get empty bookmarks', () => { 
      it('should get bookmarks',()=>{
        return pactum
        .spec()
        .get('/bookmarks')
        .withHeaders({Authorization:'Bearer $S{userAt}'})
        //.expectStatus(200)
        //.expectBody([])
        .inspect()
      })
    })

    describe('Create bookmark', () => { 
      it('should create bookmark',()=>{
        const dto:CreateBookmarkDto={
          title: 'zgora',
          link: 'https://www.youtube.com/watch?v=8AVG1A4n8VU&list=RD3rKvWFdhS18&index=7'
        }
        return pactum
        .spec()
        .post('/bookmarks ')
        .withHeaders({Authorization:'Bearer $S{userAt}'})
        .withBody(dto)
        .stores('bookmarkId', 'id')
        .inspect()
        //.expectStatus(201);
      })
    })
    
    describe('Get bookmarks', () => { 
      it('should get bookmarks',()=>{
        return pactum
        .spec()
        .get('/bookmarks ')
        .withHeaders({Authorization:'Bearer $S{userAt}'})
        .inspect(  )
        //.withBody(dto)
        //.expectStatus(200)
        //.expectJsonLength(1) 
      })
    })

    describe('Get bookmark by id', () => { 
      it('should get bookmark by id',()=>{
          return pactum
          .spec()
          .get('/bookmarks/{id} ')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({Authorization:'Bearer $S{userAt}'})
          .inspect( )
         // .expectBodyContains('$S{bookmarkId}')
      })
    })
    describe('Edit bookmark by id', () => {
      const dto:EditBookmarkDto={
        title: 'zantozara',

      }
      it('should edit bookmark by id',()=>{
        return pactum
        .spec()
        .patch('/bookmarks/{id} ')
        .withPathParams('id', '$S{bookmarkId}')
        .withBody(dto)
        .withHeaders({Authorization:'Bearer $S{userAt}'})
        //.expectStatus(200)
       // .expectBodyContains(dto.title)
        .inspect( )
       // .expectBodyContains('$S{bookmarkId}')
    })
     })
    describe('Delete bookmark by id', () => { 
      it('should delete bookmark by id',()=>{
        return pactum
        .spec()
        .delete('/bookmarks/{id} ')
        .withPathParams('id', '$S{bookmarkId}')
        .withHeaders({Authorization:'Bearer $S{userAt}'})
      })
    })
  })

  it.todo('should pass');
})