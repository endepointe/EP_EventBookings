const express = require('express');
const router = express.Router();
const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({apiKey: process.env.HUBSPOT_API_KEY})
const fs = require('fs');
const request = require('request');
const fileUpload = require('express-fileupload');
router.use('/create/', fileUpload({
	safeFileNames: true,
	preserveExtension: true,
	useTempFiles: true,
	tempFileDir: 'vendor_docs/'
})); 

// if res.body.status === error then return res.body.message
// https://developers.hubspot.com/docs/api/crm/contacts
router.post('/create', async (req, res) => {
	const forms = []
	console.log('req.files', req.files);
	Object.entries(req.files).map((file, idx) => {
		// form.append(file[0], fs.createReadStream(file[1].tempFilePath));
		console.log(file)
		forms.push(file);
	})
	console.log('forms data: ', forms);
	// send the files to the files endpoint
	///*
	let postUrl = `https://api.hubapi.com/filemanager/api/v3/files/upload?hapikey=${process.env.HUBSPOT_API_KEY}`;
	var fileOptions = {
    access: 'PRIVATE',
    ttl: 'P3M',
    overwrite: false,
    duplicateValidationStrategy: 'NONE',
    duplicateValidationScope: 'ENTIRE_PORTAL'
	};
	let i = 0;
	let fileId = [];
	console.log('forms.length: ', forms.length);
	while (i < forms.length) {
		var formData = {
			file: fs.createReadStream(forms[i][1].tempFilePath),
			options: JSON.stringify(fileOptions),
			folderId: '55439703921',
			fileName: forms[i][1].name,
		};
		request.post({
			url: postUrl,
			formData: formData,
		}, function optionalCallback(err, httpResponse, body){
			console.log(err, httpResponse.statusCode, body);
			console.log(typeof body);
			let data = JSON.parse(body);
			console.log(typeof data, data);
			let objects = data['objects'];
			let obj = objects[0];
			let id = obj['id'];
			fileId.push(id);
			return console.log('fileId: ', fileId);
		});
		i++;
	}
	
	// attach the file id to the customer object
	// var attachmentOptions = { method: 'post',
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
	// 	attachments: [/*{id: 123}*/],
	// 	metadata: { body: 'note body' } },
	// json: true };
	// request(attachmentOptions, function (error, response, body) {
	// 	if (error) throw new error(error);
	// 	console.log(body);
	// });
	// delete the file from vendor_docs/

	// perform cleanup of vendor_doc/
	//*/
		
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

	const simplePublicObjectInput = { properties };

	try {
		const apiResponse = await hubspotClient.crm.contacts.basicApi.create(simplePublicObjectInput);
		console.log(apiResponse.body);

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
	/*
	let postUrl = `https://api.hubapi.com/filemanager/api/v3/files/upload?hapikey=${process.env.HUBSPOT_API_KEY}`;

	const fileOptions = {
    access: 'PUBLIC_INDEXABLE',
    ttl: 'P3M',
    overwrite: false,
    duplicateValidationStrategy: 'NONE',
    duplicateValidationScope: 'ENTIRE_PORTAL'
	};
	const formData = {
		file: fs.createReadStream(forms[0][1].tempFilePath),
		options: JSON.stringify(fileOptions),
		folderId: '55439703921',
		fileName: forms[0][1].name,
	};
	const options = {
		hostname: 'api.hubapi.com',
		port: 443,
		path: `/filemanager/api/v3/files/upload?hapikey=${process.env.HUBSPOT_API_KEY}`,
		method: 'POST',
		headers: {
			'Content-Type': 'application/pdf'
		}
	}
	const hreq = https.request(options, res => {
		console.log(`statusCode: ${res}`)
		res.on('data', d => {
			process.stdout.write(d)
		})
	})
	hreq.on('error', error => {
		console.error(error)
	})
	hreq.write(JSON.stringify(formData));
	hreq.end();
	*/
//https://expressjs.com/en/guide/using-middleware.html#middleware.router
//https://github.com/richardgirges/express-fileupload#readme
// const multer = require('multer');
// const upload = multer.diskStorage({
// 	dest: 'vendor_docs/',
// });
/*
{"objects":[{"id":55532933242,"portal_id":3822557,"name":"BLANK_AAFES_Application-1","size":1265172,"height":null,"width":null,"encoding":null,"type":"DOCUMENT","extension":"pdf","cloud_key":"hubfs/3822557/vendor_verification_documents/BLANK_AAFES_Application-1.pdf","s3_url":"http://cdn1.hubspot.com/hubfs/3822557/vendor_verification_documents/BLANK_AAFES_Application-1.pdf","friendly_url":"https://cdn2.hubspot.net/hubfs/3822557/vendor_verification_documents/BLANK_AAFES_Application-1.pdf","alt_key":"hubfs/3822557/vendor_verification_documents/blank_aafes_application-1","alt_key_hash":"dc16852dcdc4e09cc483f89e52af24ff","title":"BLANK_AAFES_Application-1","meta":{"url_scheme":"SIMPLIFIED","allows_anonymous_access":false,"expires_at":1639800311304,"indexable":false},"created":1631937911330,"updated":1631937911330,"deleted_at":0,"folder_id":55439703921,"hidden":false,"cloud_key_hash":"423af67b2d5a6e5cd1a64e66312f05ba","archived":false,"created_by":null,"deleted_by":null,"replaceable":true,"default_hosting_url":"https://cdn2.hubspot.net/hubfs/3822557/vendor_verification_documents/BLANK_AAFES_Application-1.pdf","teams":[],"url":"https://cdn2.hubspot.net/hubfs/3822557/vendor_verification_documents/BLANK_AAFES_Application-1.pdf","is_indexable":false,"cdn_purge_embargo_time":null,"file_hash":"312bf5cf1136e0d0226522f71ad12b58"}]}
*/