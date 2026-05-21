
const menuItems = document.querySelectorAll(".menu-item");
const notesGrid = document.getElementById("trash-grid");

menuItems.forEach(function(item) {
    item.addEventListener("click", function() {
    const text = item.textContent;

    if (text === "Notes") window.location.href = "/googleKeep.html";
    if (text === "Reminders") window.location.href = "/reminders";
    if (text === "Edit labels") window.location.href = "/edit-labels"
    if (text === "Archive") window.location.href = "/archive";
    if (text === "Trash") window.location.href = "/trash";
    });
});

let notes = JSON.parse(localStorage.getItem("notes")) || []
console.log(notes)
console.log(notesGrid)
notes.forEach((note, index) => {
    if (note.deleted == true) {
        notesGrid.prepend(createCard(note, index));
    }
});

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
        notes.splice(index, 1)
        localStorage.setItem('notes', JSON.stringify(notes));
        card.remove();
    });

    return card;
}
