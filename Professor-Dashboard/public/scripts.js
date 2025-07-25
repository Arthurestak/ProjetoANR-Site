document.addEventListener('DOMContentLoaded', () => {
  const dropZone = document.getElementById('dropZone');

  dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const fileInput = dropZone.querySelector('input[type="file"]');
    fileInput.files = e.dataTransfer.files;
  });

  dropZone.addEventListener('click', () => {
    dropZone.querySelector('input[type="file"]').click();
  });
});