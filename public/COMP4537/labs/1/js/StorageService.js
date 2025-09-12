import Note from './Note.js'

export default class StorageService {
    static id () {
        const keys = Object.keys(window.localStorage);

        if (keys.length === 0) {
            return 1;
        }

        const parsedKeys = keys.map(e => parseInt(e) || 0);
        const maxKey = Math.max(...parsedKeys);

        return maxKey + 1;
    }

    static getAllNotes() {
        const notes = Object
            .entries(window.localStorage)
            .map(([key, value]) => new Note(key, value));

        return notes;
    }

    static removeNote(note) {
        window.localStorage.removeItem(note.id);
    }

    static addNote(note) {
        window.localStorage.setItem(note.id, note.content);
    }
}
