/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: 'http://127.0.0.1:4000/graphql'
	},
	plugins: {
		'houdini-svelte': {},
		'@grafbase/houdini': {}
	}
};

export default config;
