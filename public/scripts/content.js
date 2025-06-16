 document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        window.location.href = `/conteudos/${id}`; // redirecionamento simples
      });
    });
  });



// document.addEventListener('DOMContentLoaded', () => {
//   const cards = document.querySelectorAll('.card');

//   cards.forEach(card => {
//     card.addEventListener('click', async (e) => {
//       const id = e.currentTarget.getAttribute('data-id');
//           try {
//         const response = await fetch('/conteudos', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ id_sub_subject: id })
//         });

//         const data = await response.json();
//         console.log('Resposta do servidor:', data);
//       } catch (error) {
//         console.error('Erro ao enviar o ID:', error);
//       }

      
//     });
//   });
// });
