/* require fs */
var fs = require("fs");

/* ssl information */
module.exports = {
	/* ssl files */
	options: {
		key: fs.readFileSync('./ssl/dev-node.nativecamp.net.nopass.key'),
		cert: fs.readFileSync('./ssl/dev-node.nativecamp.net.crt'),
		ca: fs.readFileSync('./ssl/dev-node.nativecamp.net.ca.crt')
	},
	
	/* allowed sites */
	origins: ""
};