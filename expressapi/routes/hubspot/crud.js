const express = require('express');
const router = express.Router();
const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({apiKey: process.env.HUBSPOT_API_KEY})
const https = require('https');
const multer = require('multer');
const upload = multer();

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

// if res.body.status === error then return res.body.message
// https://developers.hubspot.com/docs/api/crm/contacts
router.post('/create', upload.any(), async (req, res) => {

	console.log(upload);
	console.log('req.body: ', req.body);
	console.log('req.files: ', req.files)
	/*
		{
			fieldname string,
			originalname: string
			encoding: '7bit',
			mimetype: 'application/pdf',
			buffer Buffer
			size int
		}
	*/
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

	// Object.entries(req.body.forms).map((pdf, idx) => {
	// 	console.log(pdf)
	// 	forms.push(pdf);
	// })

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

		// send the files to the files endpoint
		//${process.env.HUBSPOT_API_KEY}`;
		/*
			https://developers.hubspot.com/docs/api/files/files
https://knowledge.hubspot.com/files/upload-files-to-use-in-your-hubspot-content?_ga=2.74385296.340498727.1631802112-2025909848.1628381899
https://legacydocs.hubspot.com/docs/methods/files/v3/upload_new_file
		*/

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