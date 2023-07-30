import { HoudiniClient } from '$houdini';

export default new HoudiniClient({
	url: import.meta.env.VITE_GRAFBASE_API_URL,
	fetchParams({ session }) {
		return {
			headers: {
				'x-api-key': import.meta.env.VITE_GRAFBASE_API_KEY
			}
		};
	}
});
