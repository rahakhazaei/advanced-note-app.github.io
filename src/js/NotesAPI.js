const notes = [
  {
    id: 1,
    title: "first note",
    body: "this is my first note",
    CreateTime: "2022-07-01T05:32:10.429Z",
    lastUpdated: "2022-07-17T16:09:25.600Z",
    password: "123",
    favorite: true,
    color: "yellow",
  },
  {
    id: 2,
    title: "second note",
    body: "this is my second note",
    CreateTime: "2022-07-17T17:25:55.544Z",
    lastUpdated: "2022-07-17T17:26:23.815Z",
    password: "",
    favorite: false,
    color: "orange",
  },
  {
    id: 3,
    title: "third note",
    body: "this is my third note",
    CreateTime: "2022-07-17T17:33:20.130Z",
    lastUpdated: "2022-07-17T17:33:43.218Z",
    password: "",
    favorite: false,
    color: "blue",
  },
];
// const notes = [];

export default class NotesAPI {
  static getNotes() {
    const saveNotes = JSON.parse(localStorage.getItem("app-notes")) || notes;
    return saveNotes.sort((a, b) =>
      new Date(a.lastUpdated) > new Date(b.lastUpdated) ? -1 : 1
    );
  }

  static getNotesLastCreated() {
    const saveNotes = JSON.parse(localStorage.getItem("app-notes")) || notes;
    return saveNotes.sort((a, b) =>
      new Date(a.createTime) > new Date(b.createTime) ? -1 : 1
    );
  }

  static saveNotes(note) {
    const notes = NotesAPI.getNotes();
    const savedNote = notes.find((item) => item.id == note.id);
    if (savedNote) {
      savedNote.title = note.title;
      savedNote.body = note.body;
      savedNote.lastUpdated = new Date().toISOString();
      savedNote.password = note.password;
      savedNote.favorite = note.favorite;
      savedNote.color = note.color;
    } else {
      notes.push(note);
    }
    localStorage.setItem("app-notes", JSON.stringify(notes));
  }

  static deleteNote(noteID) {
    const notes = NotesAPI.getNotes();
    const result = notes.filter((n) => n.id != noteID);
    localStorage.setItem("app-notes", JSON.stringify(result));
  }


  static findNote(noteId) {
    const notes = NotesAPI.getNotes();
    return notes.find((item) => item.id == noteId);
  }
}

