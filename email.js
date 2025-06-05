let comments = [];

function handleCommentSubmission(event) {
    event.preventDefault();


    const name = document.getElementById('commentName').value.trim();
    const email = document.getElementById('commentEmail').value.trim();
    const text = document.getElementById('commentText').value.trim();


    if (!name || !text) {
        alert('Por favor, completa los campos obligatorios (Nombre y Comentario).');
        return;
    }


    const comment = {
        name: name,
        email: email,
        text: text,
        date: new Date().toLocaleString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    comments.push(comment);

    displayComments();


    clearCommentForm();

    showSuccessMessage();
}


function displayComments() {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = ''; 

    comments.forEach(comment => {
        const commentCard = document.createElement('div');
        commentCard.className = 'comment-card';

        const commentHeader = document.createElement('div');
        commentHeader.className = 'comment-header';

        const commentName = document.createElement('span');
        commentName.className = 'comment-name';
        commentName.textContent = comment.name;

        const commentDate = document.createElement('span');
        commentDate.className = 'comment-date';
        commentDate.textContent = comment.date;

        const commentText = document.createElement('p');
        commentText.className = 'comment-text';
        commentText.textContent = comment.text;

        commentHeader.appendChild(commentName);
        commentHeader.appendChild(commentDate);
        commentCard.appendChild(commentHeader);
        commentCard.appendChild(commentText);
        commentsList.appendChild(commentCard);
    });
}


function clearCommentForm() {
    document.getElementById('commentForm').reset();
}

function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = '✅ ¡Comentario enviado exitosamente!';
    successMessage.style.display = 'block';

    const formContainer = document.getElementById('commentForm').parentElement;
    formContainer.insertBefore(successMessage, document.getElementById('commentForm'));

    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}


document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', handleCommentSubmission);
    }

    displayComments();
});
