describe('Clicktrack app', function() {
	it('front page can be opened', function() {
		cy.visit('http://localhost:3000')
		cy.contains('Toggle Help')
	})

	it('User can open form to add first section', function() {
		cy.get('#add-to-start').click()
		cy.contains('Adding section')
	})

	it('User cannot submit form with empty value for number of measures', function() {
		cy.get('#add-to-start').click()
		cy.get('.num-measures-input').clear()
		cy.get('.section-form-submit').click()
		cy.get('.section-display').should('not.exist')
	})

	it('User cannot submit form with negative or decimal value for number of measures', function() {
		cy.get('.num-measures-input').type('-2')
		cy.get('.section-form-submit').click()
		cy.get('.section-display').should('not.exist')
		cy.get('.num-measures-input').clear().type('3.14')
		cy.get('.section-display').should('not.exist')
	})

	it('User cannot delete a section which they are currently editing', function() {
		cy.visit('http://localhost:3000')
		cy.get('#add-to-start').click()
		cy.get('.section-form-submit').click()
		cy.get('.edit-section-button').click()
		cy.get('.delete-section-button').click()
		cy.contains('You cannot delete this section while editing it')
		cy.get('.section-display').should('exist')
	})
})