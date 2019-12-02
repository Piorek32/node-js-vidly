const request = require("supertest");
let server = require("../../app");
const { Genre } = require('../../models/genre')
const { User } = require('../../models/user')




describe('GET /genres',  function() {
 
  it('responds with json', async function(done) {
    await Genre.remove({})
    await Genre.collection.insertMany([
      {name : 'genre1'},
      {name : 'genre2'}
    ])
    request(server)
      .get('/api/genres')

      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
      .expect((res)=>{
            if ( res.body.length !== 2) {
                throw new Error("something faild with genres ")
            }
            let some1 =  res.body.some(val => val.name === "genre1")
            let some2 =  res.body.some(val => val.name === "genre2")
  
            if (!some1 || !some2) {
             throw new Error("no genre1 or genre2")
            }  
      }, done)
  });
 });



 describe('GET /genre/:id',  function() {
 
  it('responds with json', async function(done) {
    const genre = new Genre({name : 'genre1'})
    await genre.save()
    request(server)
    .get('/api/genres/' + genre._id)
    .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
      .expect((res => {
       if (false) {

       }
      }))
  })


  it('responds 404 if id is not valid', function(done){
    request(server)
      .get('api/genres/1')
      .expect(404, done)
  })
  

})


describe('POST /', ()=> {
    it('should return 401 if client is not logged in ', function(done) {
      request(server)
        .post('/api/genres')
      .set('Accept', 'application/json')
      
        .send({name : 'genre1'})
        .expect(401, done)
      })

      it('should return 400 if genre is less than 5 characters ', function(done) {
          const token = new User().userToken()

        request(server)
          .post('/api/genres')
          .set('x-auth-token', token)
          .set('Accept', 'application/json')

        
          .send({name : 'j'})
          .expect(400, done)
        })

        it('should return 400 if genre is more than 50 characters ', function(done) {
          const token = new User().userToken()

        request(server)
          .post('/api/genres')
          .set('x-auth-token', token)
          .set('Accept', 'application/json')

        
          .send({name : 'jrgersgtesgfwefwewefwqetqwegwGAREGREGQERGQERGEQRGERGERGWQ  QSQs  qsdfgdgdhdrherherherhrherherherherherherherherherherherh'})
          .expect(400, done)
        })


        it('should save if genre is  valid ',async function(done) {
          const token = new User().userToken()
          // const genre = await Genre.find({name :'genretest' })
        request(server)
          .post('/api/genres')
          .set('x-auth-token', token)
          .set('Accept', 'application/json')
          .send({name : 'genretest'})
          .expect('Content-Type', /json/)
          .expect(200, done)
          .expect((res)=>{
            if ( res.body.name !== 'genretest' ) {
              throw new Error
            }
      }, done)
        })



})




 describe('Get', () => {
   it('should update if id is valid', async (done) => {
     const genre = new Genre({name : 'genre1'})
     await genre.save()

     request(server)
      .put('/api/genres/' + genre._id )
      .send({name : 'updategenre'})
      .expect('Content-Type', /json/)
      .expect(200, done)
   })
 })


