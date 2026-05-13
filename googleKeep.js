/* SELECT ELEMENTS */
const keepForm = document.getElementById('keep-form');
const notesGrid = document.getElementById('notes-display-grid');
const searchBar = document.getElementById('search-bar');
const noteTitle = document.getElementById('note-title');
const noteText = document.getElementById('note-text');

/* NOTE FUNKCNOST */
keepForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const titleValue = noteTitle.value;
    const textValue = noteText.value;

    if (titleValue || textValue) {
        createNoteCard(titleValue, textValue);
        keepForm.reset();
    }
});

/* CREATE NOTE CARD FUNCTION */
function createNoteCard(title, text) {
    const card = document.createElement('div');
    card.classList.add('note-card');

    card.innerHTML = `
        <div class="note-title-display">${title}</div>
        <div class="note-text-display">${text}</div>
    `;

    notesGrid.prepend(card); 
}

/* SEARCH/FILTER */
searchBar.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const allNotes = document.querySelectorAll('.note-card');

    allNotes.forEach(note => {
        const title = note.querySelector('.note-title-display').innerText.toLowerCase();
        const text = note.querySelector('.note-text-display').innerText.toLowerCase();
        
        /* If query matches title OR text, show it; otherwise hide it */
        if (title.includes(query) || text.includes(query)) {
            note.style.display = "block";
        } else {
            note.style.display = "none";
        }
    });
});

/*SIDEBAR BUTTONS */

const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(function(item) {
    item.addEventListener("click", function() {
    const text = item.textContent;

    if (text === "Notes") window.location.href = "/notes";
    if (text === "Reminders") window.location.href = "/reminders";
    if (text === "Edit labels") window.location.href = "/edit-labels"
    if (text === "Archive") window.location.href = "/archive";
    if (text === "Trash") window.location.href = "/trash";
    });
});
