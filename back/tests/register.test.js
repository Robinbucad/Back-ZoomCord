import {app,server} from '../src/app.js'
import request from 'supertest'
import {client} from '../src/users/users.model.js'
 


describe("Testing the App Register", () => {
    it("Should return 200 when user sign up or 409 if user is logged", async() => {
        const res = await request(app).post('/auth/register').send({
            email:'robin.bucad@gmail.com',
            username:'Liyi',
            password:'12',
            date:'2000-12-12',
            status:'',
            file:''
        })
        expect(res.status).toBe(403 || 231)
    })

    // it("Should return 200 On validate", async() => {
    //     const res = await request(app).get('/auth/validate?token=78a2501454d60af3985d240f2b1525a04601abca4981b3f2d3bea5792d42087b4c57a8dad4c07cc28c194db95954913b9ec1294cb2923ac4eb2aa9c86301ba1229368aa9a1103b2fde69a8ae457f26e52db704f246fa23470721dc4bb4510c4e58e8e2580c7d2a3221c00dc44974edc54efbe3b54cb56f0e67472cc655c580e8')
    //     expect(res.status).toBe(200)
    // })

    // afterAll(() => {
    //     server.close()
    //     client.close()
    // })
})