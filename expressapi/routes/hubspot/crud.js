const express = require('express');
const router = express.Router();
const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({apiKey: process.env.HUBSPOT_API_KEY})

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

router.post('/create', async (req, res) => {

});

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
		console.log(JSON.stringify(apiResponse.body, null, 2));
		res.status(200).send(apiResponse);
	} catch (e) {
		e.message === 'HTTP request failed'
			? console.error(JSON.stringify(e.response, null, 2))
			: console.error(e)
	}
	res.send({msg: 'post data to hubspot'})
})

module.exports = router;