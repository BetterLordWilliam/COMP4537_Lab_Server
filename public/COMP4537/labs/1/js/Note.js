import User from '../lang/en/User.js';
import StorageService from './StorageService.js';

export default class Note {

    constructor(id = null, content = null) {
        this.id = id || StorageService.id();
        this.container = document.createElement('div');
        this.textArea = document.createElement('textarea');
        this.removeButton = document.createElement('button');

        this.handleButtonRemoveB = this.handleButtonRemove.bind(this);
        this.handleTextContentChangedB = this.handleTextContentChanged.bind(this);

        this.container.appendChild(this.textArea);
        this.container.appendChild(document.createElement('br'));
        this.container.appendChild(this.removeButton);

        if (content && typeof content === typeof "" && content.length > 0)
            this.textArea.value = content;
        this.textArea.addEventListener('change', this.handleTextContentChangedB);

        this.removeButton.textContent = User.BUTTON_REMOVE_NOTE;
        this.removeButton.addEventListener('click', this.handleButtonRemoveB);
    }

    handleButtonRemove() {
        StorageService.removeNote(this.id);

        this.container.remove();
    }    

    handleTextContentChanged() {
        StorageService.addNote(this.id, this.textArea.value);
    }
}
