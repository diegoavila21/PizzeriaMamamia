let comments = [];

// Function to handle comment form submission
function handleCommentSubmission(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('commentName').value.trim();
    const email = document.getElementById('commentEmail').value.trim();
    const text = document.getElementById('commentText').value.trim();

    // Validate required fields
    if (!name || !text) {
        alert('Por favor, completa los campos obligatorios (Nombre y Comentario).');
        return;
    }

    // Create comment object
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

    // Add comment to array
    comments.push(comment);

    // Display comments
    displayComments();

    // Clear form
    clearCommentForm();

    // Show success message (optional)
    showSuccessMessage();
}

// Function to display comments in the comments-grid
function displayComments() {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = ''; // Clear existing comments

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

// Function to clear the comment form
function clearCommentForm() {
    document.getElementById('commentForm').reset();
}

// Function to show a success message (optional, styled like success-message)
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = '✅ ¡Comentario enviado exitosamente!';
    successMessage.style.display = 'block';

    const formContainer = document.getElementById('commentForm').parentElement;
    formContainer.insertBefore(successMessage, document.getElementById('commentForm'));

    // Remove success message after 3 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// Initialize event listener for comment form
document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', handleCommentSubmission);
    }

    // Display any existing comments (if any)
    displayComments();
});
