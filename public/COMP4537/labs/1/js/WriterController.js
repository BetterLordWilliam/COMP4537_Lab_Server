import User from '../lang/en/User.js';
import Note from './Note.js';
import Storage from './StorageService.js';

class WriterController {
    constructor() {
        console.log('Writer lives.');

        this.noteContainer = document.querySelector('#noteContainer');
        this.noteAddButton = document.querySelector('#noteAddButton');
        this.writeGoBack = document.querySelector('#goBack');

        this.handleNoteAddB = this.handleNoteAdd.bind(this);

        this.noteAddButton.textContent = User.BUTTON_ADD_NOTE;
        this.noteAddButton.addEventListener('click', this.handleNoteAddB);

        this.writeGoBack.textContent = User.BUTTON_GO_BACK;

        this.clearNoteContainer();
        this.appendNotes(Storage.getAllNotes());
    }

    clearNoteContainer() {
        while(this.noteContainer.firstChild) {
            this.noteContainer.removeChild(this.noteContainer.firstChild);
        }
    }

    appendNotes(notes) {
        try {
            for (const note of notes) {
                this.noteContainer.appendChild(note.container);
            }
        } catch (err) {
            console.error(err);
        }
    }
    
    handleNoteAdd() {
        const newNote = new Note();
        this.noteContainer.appendChild(newNote.container);
    }
}

new WriterController();
