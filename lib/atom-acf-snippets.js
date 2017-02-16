'use babel';

import AtomAcfSnippetsView from './atom-acf-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  atomAcfSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomAcfSnippetsView = new AtomAcfSnippetsView(state.atomAcfSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomAcfSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-acf-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomAcfSnippetsView.destroy();
  },

  serialize() {
    return {
      atomAcfSnippetsViewState: this.atomAcfSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('AtomAcfSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
