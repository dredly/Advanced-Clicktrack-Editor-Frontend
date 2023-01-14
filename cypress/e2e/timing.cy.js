describe('Timing Requests of the Click track app', function () {
	beforeEach(function() {
		cy.visit('http://localhost:3000')
		cy.get('#add-to-start').click()
		cy.get('.num-measures-input').clear().type('20')
		cy.get('.section-form-submit').click()
		cy.get('.expand-file-export').click()
	})

	//Run the test 5 times so results can be averaged
	for (let i = 0; i < 5; i++) {
		it('Time how long it takes to get a midi file', function () {
			cy.get('.download-midi').click()
			cy.contains('Download midi', { timeout: 60000 })
		})

		it('Time how long it takes to get a wav file', function () {
			cy.get('.download-wav').click()
			cy.contains('Download wav', { timeout: 60000 })
		})

		it('Time how long it takes to get a flac file', function () {
			cy.get('.download-flac').click()
			cy.contains('Download flac', { timeout: 60000 })
		})

		it('Time how long it takes to get an ogg file', function () {
			cy.get('.download-ogg').click()
			cy.contains('Download ogg', { timeout: 60000 })
		})
	}
})

