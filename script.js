let versiculos=[];

let atual=null;

let ultimoId = null;

async function carregarVersiculos(){

    const resposta=await fetch("versiculos.json");

    versiculos=await resposta.json();

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id"));

    if (id) {

        const encontrado = versiculos.find(v => v.id === id);

        if (encontrado) {

            atual = encontrado;

            buscarTexto();

            return;

        }

    }

    mostrarAleatorio();

}

async function mostrarAleatorio(){

    let escolhido;

    do{

        escolhido = versiculos[Math.floor(Math.random()*versiculos.length)];

    }while(escolhido.id === ultimoId);

    ultimoId = escolhido.id;

    atual = escolhido;

    const url = new URL(window.location);

    url.searchParams.set("id", atual.id);

    history.replaceState({}, "", url);

    buscarTexto();

}

async function buscarTexto(){

    loading.style.display="block";

    texto.innerHTML="";

    referencia.innerHTML="";

    tema.innerHTML = atual.tema;

    const url=`https://bible-api.com/${encodeURIComponent(atual.livro)}+${atual.capitulo}:${atual.versiculos}?translation=almeida`;

    try{

        const resposta=await fetch(url);

        const dados=await resposta.json();

        loading.style.display="none";

        texto.innerHTML=dados.text;

        referencia.innerHTML=`${atual.livro} ${atual.capitulo}:${atual.versiculos}`;

    }

    catch{

        loading.innerHTML="Não foi possível carregar o versículo.";

    }

}

novo.onclick=()=>{

    mostrarAleatorio();

}

compartilhar.onclick=()=>{

    const textoCompartilhar =
    
    `${texto.innerText}

    ${referencia.innerText}

    ${window.location.href}`;

    if(navigator.share){

        navigator.share({

            title:"Palavra para Hoje",

            text:textoCompartilhar

        });

    }else{

        navigator.clipboard.writeText(textoCompartilhar);

        alert("Versículo copiado!");

    }

}

carregarVersiculos();