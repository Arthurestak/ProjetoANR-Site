const disciplinasInput = document.querySelector('.disciplinas');
const conteudosInput = document.querySelector('.conteudos');
const tipoQuestaoInput = document.querySelector('.tipo-questao');
document.addEventListener('DOMContentLoaded', ()=>{
    conteudosInput.disabled = true;
    conteudosInput.style.cursor = 'not-allowed';
})
//filter part
function filter(){
    const filtro = document.getElementById('filtro');
    const seta = document.getElementById('seta');
    const isVisible = filtro.style.display === 'block';
    filtro.style.display = isVisible ? 'none' : 'block';
    seta.textContent = isVisible ? '▼' : '▲';
}


function avaiableInput(){
    conteudosInput.disabled = false;
    conteudosInput.style.cursor = 'text';
}
function blockInput(){
    conteudosInput.disabled = true;
    conteudosInput.style.cursor = 'not-allowed';
}
function isVisible(classMultiplas){
    const list = document.querySelector(classMultiplas);
    const isVisible = list.style.display === 'block';
    list.style.display = isVisible ? 'none' : 'block';
}
disciplinasInput.addEventListener('change', () =>{
    if(disciplinasInput.value.trim() !== ''){
        avaiableInput();
        return;
    }
    blockInput();
});

document.addEventListener('click', e =>{
    const el = e.target;
      
    if (el.classList.contains('disciplinas')) {
        isVisible('.disciplinas-multiplas');
    }       

    if(el.classList.contains('option-disciplina')){
        disciplinasInput.value = el.value;
        isVisible('.disciplinas-multiplas');
        if(disciplinasInput.value.trim() !== ''){
            avaiableInput();
        }

    }
    if(el.classList.contains('conteudos')){
        isVisible('.conteudos-multiplas');
    }
    if(el.classList.contains('option-conteudo')){
        conteudosInput.value = el.value;
        isVisible('.conteudos-multiplas');
    }
    if(el.classList.contains('tipo-questao')){
        isVisible('.tipo-multiplas');
    }
    if(el.classList.contains('option-tipo')){
        tipoQuestaoInput.value = el.value;
        isVisible('.tipo-multiplas');
    }

});

function verificarResposta(id_questao) {
    const radios = document.querySelectorAll(`input[name="resposta-${id_questao}"]`);
    const feedbackDiv = document.getElementById(`feedback-${id_questao}`);
    let respostaSelecionada = null;

    radios.forEach(radio => {
        if (radio.checked) {
            respostaSelecionada = radio;
        }
    });
    
    if (!respostaSelecionada) {
        feedbackDiv.innerHTML = "<div class='alert alerta-alerta'>Por favor, selecione uma alternativa.</div>";
        feedbackDiv.style.display = 'block'
        feedbackDiv.style.backgroundColor = '#c42b3bff';
        return;
    }

    const isCorrect = respostaSelecionada.dataset.answer === "1";
    const letraSelecionada = respostaSelecionada.dataset.label;

    if (isCorrect) {
        feedbackDiv.style.display = 'block'
        feedbackDiv.style.backgroundColor = '#2aaf49ff';
      feedbackDiv.innerHTML = `
        <div class="alert alert-successo">
          <span class="icon">🎉</span>
          <strong>Boa, Você acertou!</strong><br>
          Você escolheu a alternativa <strong>${letraSelecionada}</strong> que é a alternativa correta para essa questão
        </div>
      `;
    } else {
      const alternativaCorreta = Array.from(radios).find(r => r.dataset.answer === "1");
      const letraCorreta = alternativaCorreta.dataset.label;
      feedbackDiv.style.display = 'block'
    feedbackDiv.style.backgroundColor = '#c42b3bff';
      feedbackDiv.innerHTML = `
        <div class="alert alert-erro">
          <span class="icon">⚠️</span>
          <strong>Deu ruim, Você errou!</strong><br>
          A alternativa correta é a <strong>${letraCorreta}</strong>
        </div>
      `;
    }
  }


