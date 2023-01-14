describe('Clicktrack app', function() {
	it('front page can be opened', function() {
		cy.visit('http://localhost:3000')
		cy.contains('Toggle Help')
	})

	it('User can open form to add first section', function() {
		cy.get('#add-to-start').click()
		cy.contains('Adding section')
	})

	it('User can click cancel to leave the form without submitting', function() {
		cy.get('.section-form-cancel').click()
		cy.contains('Adding section').should('not.exist')
		cy.get('section-display').should('not.exist')
	})

	it('User can add section with default values', function() {
		cy.get('#add-to-start').click()
		cy.get('.section-form-submit').click()
		cy.contains('Section 1')
	})

	it('Section information is expanded by default', function() {
		cy.contains('Length')
		cy.contains('Time Signature')
		cy.contains('Tempo')
	})

	it('Section information can be collapsed', function() {
		cy.get('.section-display .accordion-icon').click()
		cy.contains('Length').should('not.visible')
		cy.get('.section-display .accordion-icon').click()
	})

	it('User can open form to edit section', function() {
		cy.get('.edit-section-button').click()
		cy.contains('Editing section')
	})

	it('User can change the number of measures of a section', function() {
		cy.get('.num-measures-input').clear().type('6')
		cy.get('.section-form-submit').click()
		cy.contains('6 measures')
	})

	it('User can delete section', function() {
		cy.get('.delete-section-button').click()
		cy.get('.section-display').should('not.exist')
	})

	it('Play button is disabled when there are no sections', function() {
		cy.get('#play-button').should('be.disabled')
	})

	it('It does not take longer than 4 seconds to create a longer clicktrack', function() {
		cy.visit('http://localhost:3000')
		cy.get('#add-to-start').click()
		cy.get('.num-measures-input').clear().type('200')
		cy.get('.section-form-submit').click()
		cy.get('.expand-file-export').click()
		cy.get('download-wav').click()
		cy.contains('Download wav')
	})

	describe('With a section created', function() {
		beforeEach(function () {
			cy.visit('http://localhost:3000')
			cy.get('#add-to-start').click()
			cy.get('.section-form-submit').click()
		})

		it('User can open the form to add another section after the first', function() {
			cy.get('.add-here-button').click()
		})

		it('If user selects the polyrhythm option, they are no longer able to edit the accents', function() {
			cy.get('.add-here-button').click()
			cy.get('.polyrhythm-switch').click()
			cy.get('accent-checkbox').should('not.exist')
		})

		it('If a user changes the denominator of the time signature, then tries to make \
			a polyrhythm, the denominator of the secondary time signature also changes \
			and is read-only', function() {
			cy.get('.add-here-button').click()
			// Could not simply do .select because of material ui wrapper component
			cy.get('.denominator-selection').click()
			cy.get('.option8').click()
			cy.get('.polyrhythm-switch').click()
			cy.get('.secondary-denominator-selection').contains('8').click()
			cy.get('.option4').click()
			cy.get('.secondary-denominator-selection').contains('8')
			cy.get('.secondary-denominator-selection').contains('4').should('not.exist')
		})

		it('The user can export to all of the available file types', function() {
			cy.get('.expand-file-export').click()
			for (let fileFormat of ['midi', 'wav', 'flac', 'ogg']) {
				cy.get(`.download-${fileFormat}`).click()
				cy.contains(`Download ${fileFormat}`)
			}
		})
	})
})