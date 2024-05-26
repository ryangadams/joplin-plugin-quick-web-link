import joplin from 'api';
import {ToolbarButtonLocation} from '../api/types';

const pluginName = 'openInBrowser';

async function onStart() {
	await joplin.commands.register({
		name: pluginName,
		label: 'Open in browser',
		iconName: 'fas fa-external-link-alt ',
		execute: async () => {
			const note = await joplin.workspace.selectedNote();
			if (note.source_url === '') {
				return await joplin.views.dialogs.showMessageBox('No link')
			}
			await joplin.commands.execute('openItem', note.source_url);
		},
	});

	await joplin.views.toolbarButtons.create(pluginName, pluginName, ToolbarButtonLocation.EditorToolbar);
}

joplin.plugins.register({
	onStart,
});
