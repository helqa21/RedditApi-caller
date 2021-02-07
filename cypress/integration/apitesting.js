/// <reference types="cypress" />

context('test if api is working', () => {
    beforeEach(() => {
        cy.log('starting a test')
    })

    it('api returns subreddit', () => {
        let res
        cy
            .request('GET', 'https://www.reddit.com/r/aww/top/.json')
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response).to.have.property('headers')
                expect(response).to.have.property('duration')
                res = response
        cy.log(res)
            
        })
    })
})