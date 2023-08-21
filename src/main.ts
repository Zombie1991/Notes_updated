// Get references to the HTML elements
const titleInput = document.getElementById("fname") as HTMLInputElement;
const contentInput = document.querySelector("textarea") as HTMLTextAreaElement;
const datePicker = document.getElementById("datePicker") as HTMLInputElement;
const colorPicker = document.getElementById("colorPicker") as HTMLInputElement;
const createNoteButton = document.querySelector(".btn") as HTMLButtonElement;
const notesContainer = document.getElementById("notesContainer") as HTMLDivElement;

// Function to create a new note element based on user input
function createNote() {
  const title = titleInput.value;
  const content = contentInput.value;
  const targetDate = datePicker.value;
  const color = colorPicker.value;

  // Create a new div element to hold the note
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");
  noteDiv.style.backgroundColor = color;
  noteDiv.style.width = "240px";  // Set the width to 240 pixels
  noteDiv.style.height = "240px"; // Set the height to 240 pixels

  // Create HTML content for the note
  const noteHTML = `
    <h2>${title}</h2>
    <p>${content}</p>
    <p>Target Date: ${targetDate}</p>
    <button class="delete-button">X</button>
  `;

  // Set the HTML content for the note div
  noteDiv.innerHTML = noteHTML;

  // Add the note to the notes container
  notesContainer.appendChild(noteDiv);

  // Save the notes to Local Storage
  saveNotesToLocalStorage();

}

// Function to save the notes to Local Storage
function saveNotesToLocalStorage() {
  const notes = Array.from(notesContainer.getElementsByClassName("note"));
  const notesData = notes.map(note => {
    const title = note.querySelector("h2")?.textContent || "";
    const content = note.querySelector("p:nth-child(2)")?.textContent || "";
    const targetDate = note.querySelector("p:nth-child(3)")?.textContent || "";
    const color = (note as HTMLDivElement).style.backgroundColor || "";
    const width = (note as HTMLDivElement).style.width || "";
    const height = (note as HTMLDivElement).style.height || "";
    return { title, content, targetDate, color, width, height };
  });
  localStorage.setItem("notes", JSON.stringify(notesData));
}

// Function to load the notes from Local Storage
function loadNotesFromLocalStorage() {
  const savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    const notesData = JSON.parse(savedNotes) as {
      title: string;
      content: string;
      targetDate: string;
      color: string;
      width: string;
      height: string;
    }[];
    notesData.forEach(noteData => {
      const noteDiv = document.createElement("div");
      noteDiv.classList.add("note");
      noteDiv.style.backgroundColor = noteData.color;
      noteDiv.style.width = noteData.width;
      noteDiv.style.height = noteData.height;
      const noteHTML = `
        <h2>${noteData.title}</h2>
        <p>${noteData.content}</p>
        <p>Target Date: ${noteData.targetDate}</p>
        <button class="delete-button">X</button>
      `;
      noteDiv.innerHTML = noteHTML;
      notesContainer.appendChild(noteDiv);
    });
  }
}

// Attach a click event listener to the "Create Note" button
createNoteButton.addEventListener("click", createNote);

//function to delete the note
function deleteNote(button: HTMLButtonElement) {
  const noteDiv = button.closest(".note");
  if (noteDiv) {
    noteDiv.remove();
    // Save the updated notes list to Local Storage after deleting a note
    saveNotesToLocalStorage();
  }
}

// Attach a click event listener to the notesContainer and handle button clicks
notesContainer.addEventListener("click", function (event) {
  const clickedElement = event.target;
  if (clickedElement instanceof HTMLButtonElement && clickedElement.classList.contains("delete-button")) {
    deleteNote(clickedElement);
  }
});

// Sorting function by Note Title
function sortByTitle() {
  // Convert the notes to an array
  const notes = Array.from(notesContainer.getElementsByClassName("note"));
  // Sort the notes based on the title
  notes.sort((a, b) => {
    // Get the title text content of each note
    const titleA = a.querySelector("h2")?.textContent || "";
    const titleB = b.querySelector("h2")?.textContent || "";
    // Compare the titles using localeCompare for string comparison
    return titleA.localeCompare(titleB);
  });
  // Append the sorted notes back to the notes container
  notes.forEach(note => notesContainer.appendChild(note));
}

// Sorting function by Target Date
function sortByDate() {
  // Convert the notes to an array
  const notes = Array.from(notesContainer.getElementsByClassName("note"));
  // Sort the notes based on the target date
  notes.sort((a, b) => {
    // Get the target date text content of each note
    const dateA = a.querySelector("p:nth-child(3)")?.textContent || "";
    const dateB = b.querySelector("p:nth-child(3)")?.textContent || "";
    // Compare the dates using localeCompare for string comparison
    return dateA.localeCompare(dateB);
  });
  // Append the sorted notes back to the notes container
  notes.forEach(note => notesContainer.appendChild(note));
}

// Attach a click event listener to the "Create Note" button
createNoteButton.addEventListener("click", createNote);

// Attach click event listeners to the sorting buttons
document.querySelector("#sortTitleButton")?.addEventListener("click", sortByTitle);
document.querySelector("#sortDateButton")?.addEventListener("click", sortByDate);

// Attach a click event listener to the notesContainer and handle button clicks
notesContainer.addEventListener("click", function (event) {
  const clickedElement = event.target;
  if (clickedElement instanceof HTMLButtonElement && clickedElement.classList.contains("delete-button")) {
    deleteNote(clickedElement);
  }
});

// Load the notes from Local Storage on page load
loadNotesFromLocalStorage();

// Function to delete all notes with confirmation
function deleteAllNotes() {
  // Ask for confirmation from the user before proceeding with deletion
  const confirmation = window.confirm("Are you sure you want to delete all notes?");
  if (confirmation) {
    // Remove all notes from the notes container
    notesContainer.innerHTML = "";
    // Save the updated empty notes list to Local Storage
    saveNotesToLocalStorage();
  }
}

// Attach a click event listener to the "Delete All Notes" button
const deleteAllButton = document.getElementById("Delete_all_notes");
deleteAllButton?.addEventListener("click", deleteAllNotes);

