let versiculos=[];

let atual=null;

async function carregarVersiculos(){

    const resposta=await fetch("versiculos.json");

    versiculos=await resposta.json();

    mostrarAleatorio();

}

async function mostrarAleatorio(){

    const indice=Math.floor(Math.random()*versiculos.length);

    atual=versiculos[indice];

    buscarTexto();

}

async function buscarTexto(){

    loading.style.display="block";

    texto.innerHTML="";

    referencia.innerHTML="";

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

    const textoCompartilhar=`${texto.innerText}

${referencia.innerText}`;

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