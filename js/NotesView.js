import NotesAPI from "./NotesAPI.js";
import NotesLogic from "./notesLogic.js";

export default class NotesView {
  constructor(app, newNote, notes) {
    this.app = app;
    this.showNotes(newNote, notes);
  }
  showNotes(newNote = null, notes) {
    if (notes.length === 0) {
      notes = NotesAPI.getNotes();
    }
    // empty inner HTML
    this.app.innerHTML = "";
    // localStorage.setItem("app-notes", JSON.stringify(notes));

    if (newNote) {
      notes.push(newNote);
    }
    if (notes.length == 0) {
      this.showEmptyNote(true);
      return;
    } else {
      this.showEmptyNote(false);
    }
    // make notes
    let html = "";
    notes.forEach((note) => {
      html += this._createNoteHtml(note);
      return html;
    });
    this.app.innerHTML = html;

    notes.forEach((note) => {
      this.app.querySelector(
        `.noteTitle[data-note-id="${note.id}"]`
      ).value = `${note.title}`;

      this._noteColor(note);

      this._favoriteNote(note);

      this._isSetPassword(note.password, note.id);
    });
  }

  _isSetPassword(password, noteId) {
    if (password) {
      this.app.querySelector(
        `.note-item[data-note-id="${noteId}"]`
      ).firstElementChild.style.display = "flex";
    }
  }

  showEmptyNote(isShow) {
    const emptyImg = document.querySelector(".contentEmptyImg");
    if (isShow) {
      emptyImg.style.display = "block";
    } else {
      emptyImg.style.display = "none";
    }
  }

  _noteColor(note) {
    let colorClass = "";
    note.color == "red"
      ? (colorClass = "note-color--red")
      : note.color == "yellow"
      ? (colorClass = "note-color--yellow")
      : note.color == "blue"
      ? (colorClass = "note-color--blue")
      : note.color == "purple"
      ? (colorClass = "note-color--purple")
      : note.color == "orange"
      ? (colorClass = "note-color--orange")
      : (colorClass = "note-color--gray");

    this.app
      .querySelector(`.note-item[data-note-id="${note.id}"]`)
      .classList.add(colorClass);
    this.app.querySelector(
      `.note-item[data-note-id="${note.id}"]`
    ).dataset.color = `${note.color}`;
  }

  _favoriteNote(note) {
    const favoriteBtn = this.app.querySelector(
      `.favoriteBtn[data-note-id="${note.id}"]`
    );
    note.favorite
      ? favoriteBtn.classList.add("note-favorite-btn--selected")
      : "";
  }

  _createNoteHtml(note) {
    return `<div class="note-item" data-note-id=${note.id || ""}>
    <div class="password-container">
      <span class="password-icon passwordLock"><i class="fa-solid fa-lock"></i></span>
      <input type="password" class="password-input passwordInput" autocomplete="false" />
      <button class="password-login-btn loginBtn">ورود</button>
    </div>
    <div class="password-Btn-content passwordBtnContent">
      <input type="password" class="password-input passwordValue" autocomplete="false" placeholder="رمز عبور خود را وارد کنید"/>
      <input type="password" class="password-input passwordConfirmValue" autocomplete="false" placeholder="تکرار رمز عبور"/>
      <button class="password-save-btn saveBtn">ذخیره</button>
      <span class="cancel-btn cancelBtn"><i class="fa fa-times" aria-hidden="true"></i></span>
    </div>
    <div class="note-item__header">
      <span class="note-button note-favorite-btn noteBtn favoriteBtn"  data-note-id=${
        note.id || ""
      } 
        ><i class="fa fa-star favoriteIcon" aria-hidden="true"></i>
      </span>
      <span class="note-header__password note-button noteBtn passwordBtn"
        ><i class="fas fa-key"></i>
      </span>
      <input
        class="note-header__input noteTitle"
        type="text"
        name=""
        id=""
        placeholder="عنوان متن"
        data-note-id=${note.id || ""}
      />
    </div>
    <div class="note-item__body">
      <textarea class="noteBody"
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="متن خود را بنویسید"
        data-note-id=${note.id || ""}
      >${note.body || ""}</textarea>
    </div>
    <div class="note-item__footer">
      <span class="note-footer__edit note-button noteBtn editBtn"
        ><i class="fa fa-pencil" aria-hidden="true"></i>
          <ul class="note-footer__edit-color">
            <li class="note-color note-color--red" data-color="red"></li>
            <li class="note-color note-color--yellow" data-color="yellow"></li>
            <li class="note-color note-color--blue" data-color="blue"></li>
            <li class="note-color note-color--purple" data-color="purple"></li>
            <li class="note-color note-color--orange" data-color="orange"></li>
            <li class="note-color note-color--gray" data-color="gray"></li>
          </ul>
      </span>
      <span class="note-footer__delete note-button noteBtn deleteBtn"
        ><i class="fa fa-trash"></i>
      </span>
      <span class="note-footer__date">${new Date(
        note.lastUpdated || ""
      ).toLocaleString("en", {
        dateStyle: "full",
        timeStyle: "short",
      })}</span>
    </div>
  </div>`;
  }
}
