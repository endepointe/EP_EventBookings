const express = require('express');
const router = express.Router();
const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({apiKey: process.env.HUBSPOT_API_KEY})

// if res.body.status === error then return res.body.message
// https://developers.hubspot.com/docs/api/crm/contacts
router.post('/create', async (req, res) => {
		
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