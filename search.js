document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const scrollContent = document.getElementById('scrollContent');
    const paragraphs = scrollContent.querySelectorAll('p');

    function handleButtonClick(href) {
        if (href) {
            window.location.href = href;
        }
    }
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();

        paragraphs.forEach(paragraph => {
            const text = paragraph.textContent.trim().toLowerCase();
            let highlightedText = '';

            if (searchTerm) {
                let offset = 0;

                while (true) {
                    const index = text.indexOf(searchTerm, offset);
                    if (index === -1) break;

                    highlightedText += text.substring(offset, index);
                    highlightedText += `<span class="highlight">${text.substring(index, index + searchTerm.length)}</span>`;
                    offset = index + searchTerm.length;
                }

                highlightedText += text.substring(offset);
            } else {
                highlightedText = text;
            }

            paragraph.innerHTML = highlightedText;

            paragraph.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    const href = this.getAttribute('href');
                    handleButtonClick(href);
                });
            });

            paragraph.querySelectorAll('.link-button').forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    const href = button.getAttribute('data-href');
                    handleButtonClick(href);
                });
            });

            paragraph.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    });
    paragraphs.forEach(paragraph => {
        paragraph.querySelectorAll('.link-button').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const href = button.getAttribute('data-href');
                handleButtonClick(href);
            });
        });
    });
});

