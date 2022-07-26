import NotesAPI from "./NotesAPI.js";
import NotesView from "./notesView.js";

export default class NotesLogic {
  constructor(app) {
    this.app = app;

    const notesContainer = document.querySelector(".note-items");
    notesContainer.addEventListener(
      "click",
      (ev) => {
        // edit notes
        const noteTitle = this.app.querySelectorAll(".noteTitle");
        const noteBody = this.app.querySelectorAll(".noteBody");

        noteTitle.forEach((titleField) => {
          const noteID = titleField.dataset.noteId;
          titleField.addEventListener("keyup", () => {
            const newTitle = titleField.value.trim();
            const newBody = this.app
              .querySelector(`.noteBody[data-note-id="${noteID}"]`)
              .value.trim();
            this.editNote(newTitle, newBody, noteID);
          });
        });

        noteBody.forEach((bodyField) => {
          const noteID = bodyField.dataset.noteId;
          bodyField.addEventListener("keyup", () => {
            const newBody = bodyField.value.trim();
            const newTitle = this.app
              .querySelector(`.noteTitle[data-note-id="${noteID}"]`)
              .value.trim();
            this.editNote(newTitle, newBody, noteID);
          });
        });
        this.actionOnNote();

        // show password input
        const locksNotes = this.app.querySelectorAll(".passwordLock");
        locksNotes.forEach((lock) => {
          lock.addEventListener("click", (e) => {
            e.stopImmediatePropagation();
            this.showPasswordInput(e);
          });
        });

        // submit password
        const loginBtns = this.app.querySelectorAll(".loginBtn");
        loginBtns.forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.stopImmediatePropagation();
            this.login(e.target);
          });
        });
      },
      true
    );

    this.addNote();
  }

  editNote(newTitle, newBody, noteID) {
    // save to storage
    const notes = NotesAPI.getNotes();
    let editNote = notes.find((note) => note.id == noteID);
    editNote.title = newTitle;
    editNote.body = newBody;
    NotesAPI.saveNotes(editNote);
  }

  addNote() {
    const colorBtn = document.querySelector(".sideBarNoteColor");
    colorBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const note = {
        id: new Date().getTime(),
        title: "",
        body: "",
        password: "",
        favorite: false,
        color: `${e.target.dataset.color}`,
        createTime: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };
      const newNote = new NotesView(this.app, note);
      NotesAPI.saveNotes(note);
    });
  }

  actionOnNote() {
    const action = this.app.querySelectorAll(".note-item");
    action.forEach((act) => {
      act.addEventListener(
        "click",
        (e) => {
          e.stopImmediatePropagation();

          // console.log(act.querySelector(".noteBody").value);
          // find note to action
          const noteID = act.dataset.noteId;
          const notes = NotesAPI.getNotes();
          const note = notes.find((item) => item.id == noteID);

          const actionTarget = e.target;
          if (actionTarget.classList.contains("favoriteBtn")) {
            actionTarget.classList.toggle("note-favorite-btn--selected");
            if (
              actionTarget.classList.contains("note-favorite-btn--selected")
            ) {
              note.favorite = true;
            } else {
              note.favorite = false;
            }
            NotesAPI.saveNotes(note);
            // e.stopPropagation();
          }
          if (actionTarget.classList.contains("deleteBtn")) {
            // delete from local storage
            NotesAPI.deleteNote(noteID);
            // delete from DOM
            const newNote = new NotesView(this.app);
          }
          if (actionTarget.classList.contains("editBtn")) {
            actionTarget.lastElementChild.classList.toggle("show-color-picker");
            actionTarget.lastElementChild.classList.toggle("editMode");
            if (
              actionTarget.lastElementChild.classList.contains(
                "show-color-picker"
              )
            ) {
              this.app.querySelector(".editMode").addEventListener(
                "click",
                (event) => {
                  event.target.classList.contains("note-color--red")
                    ? (note.color = event.target.dataset.color)
                    : event.target.classList.contains("note-color--yellow")
                    ? (note.color = event.target.dataset.color)
                    : event.target.classList.contains("note-color--blue")
                    ? (note.color = event.target.dataset.color)
                    : event.target.classList.contains("note-color--gray")
                    ? (note.color = event.target.dataset.color)
                    : event.target.classList.contains("note-color--purple")
                    ? (note.color = event.target.dataset.color)
                    : event.target.classList.contains("note-color--orange")
                    ? (note.color = event.target.dataset.color)
                    : "";

                  NotesAPI.saveNotes(note);
                  const newNote = new NotesView(this.app);
                },
                { once: true }
              );
            }
          }
          if (actionTarget.classList.contains("passwordBtn")) {
          }
        },
        { once: true }
      );
    });
  }

  showPasswordInput(element) {
    const lockBtn = element.target.closest(".passwordLock");
    lockBtn.classList.remove("wrong-password");
    let sibling = lockBtn.nextElementSibling;
    while (sibling) {
      sibling.classList.toggle("show-password-element");
      sibling = sibling.nextElementSibling;
    }
  }

  login(btn) {
    const noteId = btn.parentElement.parentElement.dataset.noteId;
    const note = NotesAPI.findNote(noteId);
    btn.previousElementSibling.value == note.password
      ? (btn.parentElement.style.display = "none")
      : btn.parentElement.firstElementChild.classList.add("wrong-password");
  }
}
