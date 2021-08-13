const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
	console.log('/logout req: ', req);
	console.log('/logout res: ', res);
	res.json({msg: 'logout user'});
})

module.exports = router;