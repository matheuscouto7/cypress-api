/// <reference types="cypress" />

describe('Cadastro de dipositivos', () => {

    it('Cadastrar um dispositivo', () => {

        // serve para validar o horario
        const dataAtual = new Date().toISOString().slice(0, 10)

        const body = {
            "name": "Celular do Matheus",
            "data": {
               "year": 2024,
               "price": 1949.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB",
               "owner": "MatheusCouto LTAD"
            }
         }

      cy.request({
        method: 'POST',
        url: 'https://api.restful-api.dev/objects',
        failOnStatusCode: false,
        body: body
      }).as('postDeviceResult')

        // validações
        cy.get('@postDeviceResult').then((response) => {
            expect(response.status).equal(200)
            expect(response.body.id).not.empty
            expect(response.body.createdAt).not.empty
            expect(response.body.createdAt.slice(0, 10)).equal(dataAtual)
            expect(response.body.name).equal("Celular do Matheus")
            expect(response.body.data.year).equal(2024)
            expect(response.body.data.price).equal(1949.99)
            expect(response.body.data['CPU model']).equal("Intel Core i9")

        
    
        })
    })

    it('Cadastrarum dispositivo sem mandar dados', () => {

      cy.request({
        method: 'POST',
        url: 'https://api.restful-api.dev/objects',
        failOnStatusCode: false,
        body: ''
      }).as('postDeviceResult')

        // validações
        cy.get('@postDeviceResult').then((response) => {
            expect(response.status).equal(400)
            expect(response.body.error).equal("400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.")

        
    
        })
    })
})