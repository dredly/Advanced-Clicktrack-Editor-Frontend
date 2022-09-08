describe('Timing flac export for click tracks of various lengths', function () {
	for (let i = 4; i <= 100; i += 4) {
		it(`Length of click track = ${i} sections`, function() {
			cy.visit('http://localhost:3000')
			cy.get('#add-to-start').click()
			cy.get('.num-measures-input').clear().type(i.toString())
			cy.get('.section-form-submit').click()
			cy.get('.expand-file-export').click()
			cy.get('.download-flac').click()
			cy.contains('Download flac', { timeout: 60000 })
		})
	}
})