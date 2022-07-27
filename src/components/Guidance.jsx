const Guidance = () => {
	return (
		<div>
			<h1>How to use this Application</h1>
			<ul>
				<li>{'Click on the "Add to start" button to add the first section'}</li>
				<li>
					Here you can choose a bpm,
					a duration in measures, and a time signature, represented in beats per measure.
					(e.g. 3 beats per measure = 3/4 time)</li>
				<li>
					To add an accelerando or ritardando,
					simply check the tickbox for tempo change, and select a tempo for the beginning and
					end of the section
				</li>
				<li>{'Click the "Add this section" button to confirm.'} This section can be edited or deleted later</li>
				<li>
					You can add more sections in any order, by clicking on the {'"Add to start"'} button
					or {'"Add after this Section"'}
				</li>
				<li>
					When you are finished creating and editing sections, click on the {'"Create click track"'}
					button. You can now either play the track directly in the browser or download a wav file.
				</li>
				<li><strong>Warning</strong> Downloading tracks currently not compatible with polyrhtyhms</li>
			</ul>
		</div>
	)
}

export default Guidance