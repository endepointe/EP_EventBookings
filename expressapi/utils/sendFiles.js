const hubspot = require('hubspot');
// const hubspotClient = new hubspot.Client({apiKey: process.env.HUBSPOT_API_KEY})
const hubspotClient = new hubspot({apiKey: process.env.HUBSPOT_API_KEY})
const fs = require('fs');

// input: array of forms and a hubspot contact id
// processes all the forms, returning true when complete, otherwise false.
function uploadHubspotFiles(forms, contact) {
	console.log('forms: ', forms);
	console.log('contact: ', contact);

	let i = forms.length;

	const fileOptions ={
		access: 'PRIVATE',
		overwrite: true,
		duplicateValidationStrategy: 'NONE',
		duplicateValidationScope: 'ENTIRE_PORTAL',
	};
	
	const fileDetails = {
		fileName: forms[0][1].name,
		content: fs.readFileSync(forms[0][1].tempFilePath),
		folderId: '55439703921',
		options: fileOptions,
	};

	hubspotClient.files.upload(fileDetails)
		.then(response => {
			console.log('number of forms to submit: ', i);
			// const results = [].concat(...response.map(item => item.objects));
			const results = response.objects[0].id;
			console.log('file id: ', results);

			//const attachmentIds = results;// results.map(result => result.id);

			// const attachments = attachmentIds.map(attachmentId => (
			// 	{id: attachmentId}));

			const noteEngagement = {
				engagement: {
					acive: true,
					type: "NOTE",
				},
				associations: {
					contactIds: [contact]
				},
				metadata: {
					body: 'file added to contact'
				},
				attachments: [{id: results}], //attachments,
			};
			const value = hubspotClient.engagements.create(noteEngagement)
											.then(response => {
												console.log(response);
												console.log('uploaded file');
											});
			console.log('value: ', value);
			return {result: true, value: value};
		})

		
		// return {result: false};
}

module.exports = {
	uploadHubspotFiles: uploadHubspotFiles
}