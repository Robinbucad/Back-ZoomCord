import {app,server} from '../src/app.js'
import request from 'supertest'
import {client} from '../src/users/users.model.js'
 


describe("Testing ", () => {
    it("Get user should response 401", async() => {
        const res = await request(app).get('/users').send()
        expect(res.status).toBe(401)
    })

    it("Should return response 200", async() => {
        const res = await request(app).get('/users/')
    })

    afterAll(() => {
        server.close()
        client.close()
    })
})