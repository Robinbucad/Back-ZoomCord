import {app,server} from '../src/app.js'
import request from 'supertest'
import {client} from '../src/users/users.model.js'
 


describe("Testing the App Login", () => {
    it("Get user should response 401", async() => {
        const res = await request(app).get('/users').send()
        expect(res.status).toBe(401)
    })

    it("Should return 200 when user logs", async() => {
        const res = await request(app).post('/auth/login').send({
            email:'kaxal14855@procowork.com',
            password:'12'
        })
        expect(res.status).toBe(201)
    })

    afterAll(() => {
        server.close()
        client.close()
    })
})