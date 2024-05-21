/// <reference types="cypress" />

describe('Deletar um dipositivos', () => {

    it('Deletar um dispositivo não existente', () =>  {

      const id_inexistente = 'couto'

      cy.request({
      method: 'DELETE',
      url: `https://api.restful-api.dev/objects/${id_inexistente}`, // isso serve para pegar o ID e smp que vier um novo ele já pega auto ${response_post.body.id}`
      failOnStatusCode: false,
      }).as('deleteDeviceResult')

      // validações
      cy.get('@deleteDeviceResult').then((response_del) => {
        expect(response_del.status).equal(404)
        expect(response_del.body.error).equal(`Object with id = ${id_inexistente} doesn't exist.`)
        })
    })      
})

