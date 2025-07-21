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
