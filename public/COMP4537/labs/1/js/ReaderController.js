import User from '../lang/en/User.js';
import NoteController from './NoteController.js';

class ReaderController extends NoteController {
    constructor() {
        super();

        this.listUpdated = document.querySelector('#listUpdated');
        this.noteContainer = document.querySelector('#noteContainer');

        this.handleWindowStorageB = this.handleWindowStorage.bind(this);
        
        // Can just use an event listener for when the window storage object is modified
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
        window.addEventListener('storage', this.handleWindowStorageB);

        this.reset();
    }

    handleWindowStorage() {
        console.log('Storage updated');

        this.listUpdated.textContent = ''
            .concat(User.NOTE_LIST_UPDATED)
            .concat(new Date().toLocaleString());

        this.reset();
    }
}

new ReaderController();
