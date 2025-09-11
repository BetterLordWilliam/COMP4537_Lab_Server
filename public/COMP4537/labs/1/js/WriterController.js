import User from '../lang/en/User.js';
import NoteController from './NoteController.js';
import NoteItemController from './NoteItemController.js';

class WriterController extends NoteController {
    constructor() {
        super();

        this.noteAddButton = document.querySelector('#noteAddButton');
        this.writeGoBack = document.querySelector('#goBack');

        this.handleNoteAddB = this.handleNoteAdd.bind(this);

        this.noteAddButton.textContent = User.BUTTON_ADD_NOTE;
        this.noteAddButton.addEventListener('click', this.handleNoteAddB);

        this.writeGoBack.textContent = User.BUTTON_GO_BACK;

        this.reset();
    }
    
    handleNoteAdd() {
        const newNote = new NoteItemController();
        this.noteContainer.appendChild(newNote.container);
    }
}

new WriterController();
