import { graphql } from '$houdini';
import { fail } from '@sveltejs/kit';

export const actions = {
	create: async (event) => {
		const data = await event.request.formData();

		console.log({ name: data.get('name')?.toString(), boxId: data.get('boxId')?.toString() });
		const name = data.get('name')?.toString();
		if (!name) return fail(403, { name: 'name', message: 'Name is required' });

		const boxId = data.get('boxId')?.toString();
		if (!boxId) return fail(403, { name: 'boxId', message: 'Box ID is required' });

		const actionMutation = graphql(`
			mutation ContentCreate($input: ContentCreateInput!) {
				contentCreate(input: $input) {
					content {
						id
						name
					}
				}
			}
		`);

		return await actionMutation.mutate({ input: { name, box: { link: boxId } } }, { event });
	},
	update: async (event) => {
		const data = await event.request.formData();

		console.log({
			contentId: data.get('contentId')?.toString(),
			name: data.get('name')?.toString(),
			boxId: data.get('boxId')?.toString()
		});

		const contentId = data.get('contentId')?.toString();
		if (!contentId) return fail(403, { name: 'contentId', message: 'Content ID is required' });

		const name = data.get('name')?.toString();
		if (!name) return fail(403, { name: 'name', message: 'Name is required' });

		const boxId = data.get('boxId')?.toString();
		if (!boxId) return fail(403, { name: 'boxId', message: 'Box ID is required' });

		const actionMutation = graphql(`
			mutation ContentUpdate($by: ContentByInput!, $input: ContentUpdateInput!) {
				contentUpdate(by: $by, input: $input) {
					content {
						id
						name
					}
				}
			}
		`);

		return await actionMutation.mutate(
			{ by: { id: contentId }, input: { name, box: { link: boxId } } },
			{ event }
		);
	},
	delete: async (event) => {
		const data = await event.request.formData();

		console.log({
			contentId: data.get('contentId')?.toString()
		});

		const contentId = data.get('contentId')?.toString();
		if (!contentId) return fail(403, { name: 'contentId', message: 'Content ID is required' });

		const actionMutation = graphql(`
			mutation ContentDelete($by: ContentByInput!) {
				contentDelete(by: $by) {
					deletedId
				}
			}
		`);

		return await actionMutation.mutate({ by: { id: contentId } }, { event });
	},
	deleteBox: async (event) => {
		const data = await event.request.formData();

		console.log({
			boxId: data.get('boxId')?.toString()
		});

		const boxId = data.get('boxId')?.toString();
		if (!boxId) return fail(403, { name: 'boxId', message: 'Box ID is required' });

		const actionMutation = graphql(`
			mutation BoxDelete($by: BoxByInput!) {
				boxDelete(by: $by) {
					deletedId
				}
			}
		`);

		return await actionMutation.mutate({ by: { id: boxId } }, { event });
	}
};
