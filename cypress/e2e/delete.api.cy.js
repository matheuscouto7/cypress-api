/// <reference types="cypress" />

describe('Deletar um dipositivos', () => {

    it('Deletar um dispositivo', () =>  {

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
         // primeiro você cadastra o produto
        cy.request({
        method: 'POST',
        url: 'https://api.restful-api.dev/objects',
        failOnStatusCode: false,
        body: body
      }).as('postDeviceResult')

      // pegando o result do cadastro
      // para pegar o ID
      cy.get('@postDeviceResult').then((response_post) => {
        expect(response_post.status).equal(200)

      cy.request({
      method: 'DELETE',
      url: `https://api.restful-api.dev/objects/${response_post.body.id}`, // isso serve para pegar o ID e smp que vier um novo ele já pega auto ${response_post.body.id}`
      failOnStatusCode: false,
      }).as('deleteDeviceResult')

      // validações
      cy.get('@deleteDeviceResult').then((response_del) => {
        expect(response_del.status).equal(200)
        expect(response_del.body.message).equal(`Object with id = ${response_post.body.id} has been deleted.`)
        })

    


    })      

})

})

