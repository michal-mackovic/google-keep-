// elements
const keepForm = document.getElementById('keep-form');
const notesGrid = document.getElementById('notes-display-grid');
const searchBar = document.getElementById('search-bar');
const noteTitle = document.getElementById('note-title');
const noteText = document.getElementById('note-text');

// save note
keepForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const titleValue = noteTitle.value;
    const textValue = noteText.value;

    if (titleValue || textValue) {
        createNote(titleValue, textValue);
        keepForm.reset();
    }
});

// create note
let notes = JSON.parse(localStorage.getItem("notes")) || []

function createCard(note, index) {
    const card = document.createElement('div');
    card.classList.add('note-card');

    card.innerHTML = `
        <div class="note-title-display">${note.title}</div>
        <div class="note-text-display">${note.text}</div>
        <div class="note-actions">
            <button class="delete-btn">🗑</button>
        </div>
    `;

    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        notes[index].deleted = true;
        localStorage.setItem('notes', JSON.stringify(notes));
        card.remove();
    });

    return card;
}

// načítanie uložených notes
notes.forEach((note, index) => {
    if (note.deleted == false) {
        notesGrid.prepend(createCard(note, index));
    }
});

function createNote(title, text) {
    notes.push({
        title: title,
        text: text,
        deleted: false
    });
    localStorage.setItem('notes', JSON.stringify(notes));

    const index = notes.length - 1;
    notesGrid.prepend(createCard(notes[index], index));
}

// search notes
searchBar.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const noteCards = document.querySelectorAll('.note-card');

    noteCards.forEach(note => {
        const title = note.querySelector('.note-title-display').innerText.toLowerCase();
        const text = note.querySelector('.note-text-display').innerText.toLowerCase();

        if (title.includes(query) || text.includes(query)) {
            note.style.display = "block";
        } else {
            note.style.display = "none";
        }
    });
});

// sidebar buttons
const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(function(item) {
    item.addEventListener("click", function() {
        const text = item.textContent;

        if (text === "Notes") window.location.href = "/notes";
        if (text === "Reminders") window.location.href = "/reminders";
        if (text === "Edit labels") window.location.href = "/edit-labels";
        if (text === "Archive") window.location.href = "/archive";
        if (text === "Trash") window.location.href = "/trash/trash.html";
    });
});
