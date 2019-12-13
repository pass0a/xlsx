import { createReadStream } from 'fs';
import * as htmlparser2 from 'htmlparser2';
import { Element, Node, DataNode } from 'domhandler';

let domhandler = new htmlparser2.DomHandler((error, dom) => {
	if (error) {
		// Handle error
		console.log(error);
	} else {
		// Parsing completed, do something
		console.log(dom.length);
		for (const iterator of dom) {
			if ('tag' == iterator.type) {
				let tag = iterator as Element;
				console.log(tag.tagName, tag.name);
				let x = htmlparser2.DomUtils.getElementById('hell', dom);
				
				// for (const key in tag.attribs) {
				// 	console.log(key, '=>', tag.attribs[key]);
				// }
			}
		}
	}
});
const parser = new htmlparser2.Parser(domhandler, { decodeEntities: true });
let source = createReadStream(__dirname + '/../test/test.xml', { encoding: 'utf8', highWaterMark: 1024 * 64 });
let processing = 0;
source.on('data', (data) => {
	console.log('handleing:', (processing += data.length));
	parser.write(data);
});
source.on('end', () => {
	parser.end();
});
// parser.write("Xyz <script type='text/javascript'>var foo = '<<bar>>';</ script>");
// parser.end();
