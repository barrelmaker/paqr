import { HoudiniClient } from '$houdini';

export default new HoudiniClient({
	url: 'http://127.0.0.1:4000/graphql',
	fetchParams({ session }) {
		return {
			headers: {
				'x-api-key': '' // get this from .env in for prod. Can be an empty string in dev.
			}
		};
	}
});
