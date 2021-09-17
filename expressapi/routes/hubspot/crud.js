const express = require('express');
const router = express.Router();
const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({apiKey: process.env.HUBSPOT_API_KEY})
// const {Buffer} = require('buffer');
// const fs = require('fs');
// const https = require('https');
const fileUpload = require('express-fileupload');
router.use('/create/', fileUpload({
	safeFileNames: true,
	preserveExtension: true,
	useTempFiles: true,
	tempFileDir: 'vendor_docs'
})); 

//https://expressjs.com/en/guide/using-middleware.html#middleware.router
//https://github.com/richardgirges/express-fileupload#readme
// const multer = require('multer');
// const upload = multer.diskStorage({
// 	dest: 'vendor_docs/',
// });

// Hubspot Contact Properties
/*
	firstname,
	lastname,
	email,
	phone,
	branch_of_service_affiliation,
	military_status,
	company,
	website,
	description_of_business,
	twitter_profile,
	instagram,
	facebook_profile,
	linkedin_profile,
	aafes_application_form,
	aafes_visitor_form,
	w9,
	photo_release_form,
	company_logo,
	proof_of_veteran_or_military_spouse_status,
	vendor_head_shot,
*/

let	fields = [
	{name: 'aafes', maxCount: 1},
	{name: 'w9', maxCount: 1},
	{name: 'visitorPass', maxCount: 1},
	{name: 'photoRelease', maxCount: 1},
	{name: 'companyLogo', maxCount: 1},
	{name: 'proofOfStatus', maxCount: 1},
	{name: 'vendorHeadshot', maxCount: 1},
];

// if res.body.status === error then return res.body.message
// https://developers.hubspot.com/docs/api/crm/contacts
router.post('/create', async (req, res) => {
	console.log('req.files', req.files);
	console.log('req.files.aafes.name: ', req.files.aafes.name);

		// send the files to the files endpoint
		/*
			https://developers.hubspot.com/docs/api/files/files

			https://knowledge.hubspot.com/files/upload-files-to-use-in-your-hubspot-content?_ga=2.74385296.340498727.1631802112-2025909848.1628381899
			
			https://legacydocs.hubspot.com/docs/methods/files/v3/upload_new_file

			let	fields = [
				{name: 'aafes', maxCount: 1},
				{name: 'w9', maxCount: 1},
				{name: 'visitorPass', maxCount: 1},
				{name: 'photoRelease', maxCount: 1},
				{name: 'companyLogo', maxCount: 1},
				{name: 'proofOfStatus', maxCount: 1},
				{name: 'vendorHeadshot', maxCount: 1},
			]
			folderId: '55439703921'
			process.env.HUBSPOT_API_KEY
			{
				fieldname string,
				originalname: string
				encoding: '7bit',
				mimetype: 'application/pdf',
				buffer Buffer
				size int
			}
		*/
	let postUrl = `https://api.hubapi.com/filemanager/api/v3/files/upload?hapikey=${process.env.HUBSPOT_API_KEY}`;

	let fileOptions = {
			access: 'PRIVATE',
			ttl: 'P3M',
			overwrite: true,
			duplicateValidationStrategy: 'NONE',
			duplicateValidationScope: 'ENTIRE_PORTAL'
	};

	// var formData = {
	// 		file: fs.createReadStream(`./vendor_docs/${req.files.aafes.name}`),
	// 		options: JSON.stringify(fileOptions),
	// };
	const properties = {
		"firstname": req.body.firstName,
		"lastname": req.body.lastName,
		"email": req.body.email,
		"phone": req.body.phoneNumber,
		"branch_of_service_affiliation": req.body.militaryBranch,
		"military_status": req.body.militaryStatus,
		"company": req.body.companyName,
		"website": req.body.websiteUrl,
		"description_of_business": req.body.description,
		"twitter_profile": req.body.twitter,
		"instagram": req.body.instagram,
		"facebook_profile": req.body.facebook,
		"linkedin_profile": req.body.linkedin,
	};

	// const forms = {
	// 	"aafes_application_form": {},
	// 	"aafes_visitor_form": {},
	// 	"w9": {},
	// 	"photo_release_form": {},
	// 	"company_logo": {},
	// 	"proof_of_veteran_or_military_spouse_status": {},
	// 	"vendor_head_shot": {},
	// };

	const simplePublicObjectInput = { properties };

	try {
		const apiResponse = await hubspotClient.crm.contacts.basicApi.create(simplePublicObjectInput);
		console.log(apiResponse.body);

		// attach the uploaded form ids to the contact
		// var options = { method: 'post',
		// url: 'https://api.hubapi.com/engagements/v1/engagements',
		// qs: { hapikey: process.env.hubspot_api_key },
		// headers: 
		// {'content-type': 'application/json' },
		// body: 
		// { engagement: 
		// 		{ active: true,
		// 			//ownerid: 1, // used for assigned_to field, optional
		// 			type: 'note',
		// 			timestamp: Date.now() },
		// 	associations: 
		// 		{ contactids: [ apiResponse.body.id ],
		// 			companyids: [],
		// 			dealids: [],
		// 			ownerids: [] },
		// 	attachments: forms,
		// 	metadata: { body: 'note body' } },
		// json: true };
		// request(options, function (error, response, body) {
		// 	if (error) throw new error(error);
		// 	console.log(body);
		// });

		// send the user data to front-end
		res.send(JSON.stringify(apiResponse.body, null, 2))
	} catch (e) {
		e.message === 'HTTP request failed'
			? console.error(JSON.stringify(e.response, null, 2))
			: console.error(e)
	}
});

router.post('/find/user', async (req,res) => {
	console.log('find email: ', req.body.email);
	const contactId = req.body.email;
	const properties = [
		"firstname",
		"lastname",
		"email",
		"phone",
		"branch_of_service_affiliation",
		"military_status",
		"company",
		"website",
		"description_of_business",
		"twitter_profile",
		"instagram",
		"facebook_profile",
		"linkedin_profile",
	];
	const associations = undefined;
	const archived = false;
	const idProperty = 'email';
	
	try {
		const apiResponse = await hubspotClient.crm.contacts.basicApi.getById(contactId, properties, associations, archived, idProperty);
		console.log(JSON.stringify(apiResponse.body, null, 2));
		res.send({error: false, data: apiResponse.body});
	} catch (e) {
		e.message === 'HTTP request failed'
			? console.error(JSON.stringify(e.response, null, 2))
			: console.error(e)
		res.send({error: true, statusCode: e.statusCode, msg: 'user not found' })
	}
})

router.get('/read', async (req, res) => {
	const limit = 10;
	const after = undefined;
const properties = [
  "military_status",
  "aafes_application",
  "firstname",
  "lastname",
  "email"
];
	const associations = undefined;
	const archived = false;
	
	try {
		const apiResponse = await hubspotClient.crm.contacts.basicApi.getPage(limit, after, properties, associations, archived);
		// console.log(JSON.stringify(apiResponse.body, null, 2));
		res.status(200).send(apiResponse);
	} catch (e) {
		e.message === 'HTTP request failed'
			? console.error(JSON.stringify(e.response, null, 2))
			: console.error(e)
	}
	// res.send({msg: 'post data to hubspot'})
})

module.exports = router;