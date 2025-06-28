const form = document.querySelector('.question-form');
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      const url = window.location.href;
      const id = e.currentTarget.getAttribute('data-id');

      if(url.includes('conteudos')){
        window.location.href = `/questao/${id}/1`; 
      }else{
        window.location.href = `/conteudos/${id}`; 
      }
    });
  })
})
 
