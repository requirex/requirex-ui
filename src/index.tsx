import { assign } from 'requirex';
import { ZipFile } from '@lib/zip';
import { TarFile } from '@lib/tar';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			[name: string]: any;
		}
	}
}

function init(doc: Document) {
	return function h(
		kind: string,
		attr: {[key: string]: any},
		...children: (HTMLElement | Text | string)[]
	) {
		const element = doc.createElement(kind);

		for(let child of children) {
			if(typeof(child) != 'object') {
				child = doc.createTextNode(child);
			}

			element.appendChild(child);
		}

		return assign(element, attr, 1);
	}
}

export class Popup {

	constructor() {
		const h = init(document);

		const popup = (
			<div
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: 0x7fffffff
				}}>
				<iframe
					style={{
						borderWidth: 0,
						width: '100%',
						height: '100%'
					}} onload={
						(e: Event) => this.loaded(
							(e.target as HTMLIFrameElement).contentWindow!.document
						)
					} />
			</div>
		);

		document.body.appendChild(popup);
	}

	loaded(doc: Document) {
		const h = init(doc);

		const content = (
			<div style={{
				position: 'fixed',
				top: '50%',
				left: '50%',
				width: '75%',
				height: '75%',
				transform: 'translate(-50%,-50%)',

				backgroundColor: '#fff',

				boxShadow:
					'0 0 64px 32px rgba(0,0,0,0.75)'
			}}>
				<div style={{
					backgroundColor: '#fff',
					borderRadius: '0.25em',
					fontSize: '36pt',

					boxShadow:
						'0 0 16px 8px rgba(0,0,0,0.75)'
				}}>
					{'\ud83d\udce6 \ud83d\udc1e'}
				</div>
			</div>
		);

		doc.body.style.backgroundColor = 'rgba(0,0,0,0.25)';
		doc.body.appendChild(content);
	}

}
