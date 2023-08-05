import { graphql } from '$houdini';
import { fail, type Actions } from '@sveltejs/kit';

export const actions = {
	create: async (event) => {
		const data = await event.request.formData();

		const name = data.get('name')?.toString();
		if (!name) return fail(403, { name: '*' });

		const description = data.get('description')?.toString();

		const actionMutation = graphql(`
			mutation BoxCreate($input: BoxCreateInput!) {
				boxCreate(input: $input) {
					box {
						id
						name
						description
					}
				}
			}
		`);

		return await actionMutation.mutate({ input: { name, description } }, { event });
	}
} satisfies Actions;
