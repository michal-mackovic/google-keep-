const keepForm = document.getElementById('keep-form');
const notesGrid = document.getElementById('notes-display-grid');

keepForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const titleValue = document.getElementById('note-title').value;
    const textValue = document.getElementById('note-text').value;

    if (titleValue || textValue) {
        createNoteCard(titleValue, textValue);
        keepForm.reset();
    }
});

function createNoteCard(title, text) {
    const card = document.createElement('div');
    card.classList.add('note-card');

    card.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 8px;">${title}</div>
        <div>${text}</div>
    `;

    notesGrid.appendChild(card);
}