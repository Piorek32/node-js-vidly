const request = require("supertest");
let server = require("../../app");
const { Genre } = require('../../models/genre')

// describe("/api/genres", () => {
//   beforeEach(() => {
//     server = require("../../app");
//   });
//   afterEach(() => {
//     server.close();
//   });
//   describe(" GET /", () => {
//     it("return all genres", async () => {
//       const res = await request(server).get("/api/genres");
//       expect(res.status).toBe(200);
//     });
//   });
// });



describe('GET /user',  function() {
 
  it('responds with json', async function(done) {
    await Genre.remove({})
    await Genre.collection.insertMany([
      {name : 'genre1'},
      {name : 'genre2'}
    ])
    request(server)
      .get('/api/genres')
     // .auth('username', 'password')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
      .expect((res)=>{
            if ( res.body.length !== 2) {
                throw new Error("something faild with genres ")
            }
            let some1 =  res.body.some(val => val.name === "genre1")
            let some2 =  res.body.some(val => val.name === "genre2")
            console.log(some1, some2)
            if (!some1 || !some2) {
           //  throw new Error("no genre1 or genre2")
            }  
      }, done)
  });


  it('return genre is id is valid', () => {

  })
 });



 