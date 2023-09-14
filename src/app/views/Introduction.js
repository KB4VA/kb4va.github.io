import { inject, observer } from "mobx-react";
import { Typography, Dialog, DialogTitle, DialogContent, DialogContentText } from "@material-ui/core";
import packageJson from "../../../package.json";


function Introduction({ store }) {



	return <Dialog
		onClose={store.handleReadMeClose}
		open={store.isReadMeOpen}
		maxWidth='lg'
		fullWidth>
		<DialogTitle>Introduction to VAID</DialogTitle>
		<DialogContent>
			<embed
				src={packageJson.homepage + "/codebook.pdf#toolbar=0&navpanes=0&scrollbar=0"}
				style={{width: '100%', height: '800px'}}
			></embed>
			{/* <DialogContentText>
				Here is the introduction to KB4VA specifications, including analytical task specifications and design specification.
			</DialogContentText>
			<Typography variant='h5'>Analytical Tasks</Typography>
			<DialogContentText>
				The categorization of analytical tasks is based on Brehmer M, Munzner T. A multi-level typology of abstract visualization tasks[J]. IEEE transactions on visualization and computer graphics, 2013, 19(12): 2376-2385. Specifically, a task is described as a pair of "action" and "target".
			</DialogContentText>
			<img src={process.env.PUBLIC_URL + "/action-target.png"} style={{maxWidth: '800px'}}></img>
			<DialogContentText>
			The Figure is from Munzner T. Visualization analysis and design[M]. CRC press, 2014. Page 46 and Page 56.
			</DialogContentText>
			<Typography variant='h6'>Actions</Typography>
			<DialogContentText>
				The following definitions of actions are directly quoted from Brehmer and Munzner's multi-level typology.
			</DialogContentText>
			<ul>
				<li>
					<b>Consume</b>
					<ul>
						<li><b>Present</b> refers to "the use of visualization for the succinct communication of information, for telling a story with data, guiding an audience through a series of cognitive operations".</li>
						<li><b>Discover</b> is "about the generation and verification of hypotheses, associated with modes of scientific inquiry".</li>
						<li><b>Enjoy</b> refers to “casual encounters with visualization”</li>
					</ul>
				</li>
				<li>
					<b>Produce</b>: We use produce in reference to "tasks in which the intent is to generate new artifacts, including transformed or derived data, annotations, recorded visualization interactions, or screenshots of static visualizations".
				</li>

				<li>
					<b>Search</b>: Search includes four different types which is categorized based on the targets and locations.
					<ul>
						<li>Lookup: target known, location known</li>
						<li>Browse: target unknown, location known</li>
						<li>Locate: target known, location unknown</li>
						<li>Explore: target unknown, location unknown</li>
					</ul>
				</li>
				<li>
					<b>Query</b>
					<ul>
						<li>Identify: "returns characteristics or reference for a target"</li>
						<li>Compare: "returns characteristics or reference for two or multiple targets"</li>
						<li>Summarize: "returns characteristics or reference for a whole set of targets"</li>
					</ul>
				</li>
			</ul> */}
		</DialogContent>
	</Dialog>
}

export default inject('store')(observer(Introduction));