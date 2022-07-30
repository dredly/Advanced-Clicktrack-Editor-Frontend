import Tippy from '@tippyjs/react'

const HelpIcon = ({ content }) => {
	return (
		<Tippy content={content}>
			<button type="button" className="help-icon">?</button>
		</Tippy>
	)
}

export default HelpIcon