import NotesAPI from "./NotesAPI.js";
import NotesLogic from "./notesLogic.js";
import NotesView from "./notesView.js";

const sortMenu = document.querySelector(".navBarSort");
const favoriteMenu = document.querySelector(".navBarFavorite");
const addBtn = document.querySelector(".add-button");
const noteColor = document.querySelector(".sideBarNoteColor");
const app = document.getElementById("app");

document.addEventListener("DOMContentLoaded", (event) => {
  const view = new NotesView(app);
  const notesLogic = new NotesLogic(app);
});

// menu
document.addEventListener("click", (e) => {
  const isSortMenuClickInsideElement = sortMenu.contains(e.target);
  if (!isSortMenuClickInsideElement) {
    sortMenu.classList.remove("toggleMenu");
  }

  const isFavMenuClickInsideElement = favoriteMenu.contains(e.target);
  if (!isFavMenuClickInsideElement) {
    favoriteMenu.classList.remove("toggleMenu");
  }

  // color picker
  // if (app.childElementCount > 0) {
  //   const editBtn = document.querySelectorAll(".editBtn");
  //   editBtn.forEach((btn) => {
  //     if (btn.lastElementChild.classList.contains("editMode")) {
  //       const colorPicker = btn.lastElementChild;
  //       const isColorPickerClickInsideElement = colorPicker.contains(e.target);
  //       if (!isColorPickerClickInsideElement) {
  //         colorPicker.classList.remove("show-color-picker", "editMode");
  //       }
  //     }
  //   });
  // }
});

// password. lock icon clicked 


sortMenu.addEventListener("click", (e) => {
  sortMenu.classList.toggle("toggleMenu");
});

favoriteMenu.addEventListener("click", (e) => {
  favoriteMenu.classList.toggle("toggleMenu");
});

// add btn
addBtn.addEventListener("click", () => {
  noteColor.classList.toggle("expand");
});
