const crypto = require('crypto');
const fs = require('fs');

crypto.generateKeyPair('rsa', {
	modulusLength: 4096,
	publicKeyencoding: {
		type: 'spki',
		format: 'pem',
	},
	privateKeyEncoding: {
		type: 'pkcs8',
		format: 'pem',
		cipher: 'aes-256-cbc',
		passphrase: 'allyourbasearebelongtous'
	}
}, (err, publicKey, privateKey) => {
	const newline = /\n/g;
	const str = privateKey.replace(newline, '');
	fs.writeFile('./key.txt', str, (err) => {
		if (err) {
			console.error(err);
			return;
		} else {
			console.log('keys created.');
		}
	});
})