/// <reference types="cypress" />

describe('Alterar dipositivos', () => {

    it('Alterar um dispositivo', () =>  {

      const dataAtual = new Date().toISOString().slice(0, 16)

        const body_cadastro = {
            "name": "Celular do Matheus",
            "data": {
               "year": 2024,
               "price": 1949.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB",
               "owner": "MatheusCouto LTAD"
            }
         }

         const body_update = {
          "name": "Celular do Matheus - UPDATE",
          "data": {
             "year": 2010,
             "price": 1949.99,
             "CPU model": "Intel Core i9",
             "Hard disk size": "1 TB",
             "owner": "EMPRESA LTAD"
          }
       }



         // primeiro você cadastra o produto
        cy.request({
        method: 'POST',
        url: 'https://api.restful-api.dev/objects',
        failOnStatusCode: false,
        body: body_cadastro
      }).as('postDeviceResult')

      // pegando o result do cadastro
      // para pegar o ID
      cy.get('@postDeviceResult').then((response_post) => {
        expect(response_post.status).equal(200)
        expect(response_post.body.name).equal(body_cadastro.name)

        // fazer o PUT
      cy.request({
      method: 'PUT',
      url: `https://api.restful-api.dev/objects/${response_post.body.id}`, // isso serve para pegar o ID e smp que vier um novo ele já pega auto ${response_post.body.id}`
      failOnStatusCode: false,
      body: body_update
      }).as('putDeviceResult')

      // validações do PUT
      cy.get('@putDeviceResult').then((response_put) => {
        expect(response_put.status).equal(200)
        expect(response_put.body.name).equal(body_update.name)
        expect(response_put.body.data.owner).equal(body_update.data.owner)
        expect(response_post.body.createdAt.slice(0, 16)).equal(dataAtual)
        })
    })      
  })
})

