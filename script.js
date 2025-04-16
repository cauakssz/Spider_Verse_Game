// Versão otimizada com pré-carregamento e controle de instâncias
let spiderAudio = null;
let isAudioReady = false;
let spiderSimbionteDerrotado = false;
let musicaSimbionte = null;
let venomDerrotado = false;  // Adicionado para Venom
let musicaVenom = null;      // Adicionado para Venom
let tobeyDerrotado = false;
let musicaTobey = false;


// Função para o botão da tela3
function handleTela3Button() {
    playSpiderSound();
    
    if (spiderSimbionteDerrotado) {
        mostrarTelaComSom('tela4');
        spiderSimbionteDerrotado = false;
       }
  
      else if (venomDerrotado) {  // Adicionado condição para Venom
        mostrarTelaComSom('tela5');  // Usando tela5 para Venom
        venomDerrotado = false;
     }
     else if (tobeyDerrotado) {
       mostrarTelaComSom('tela6')
       tobeyDerrotado = false;
       
    } else {
        mostrarTelaComSom('tela1');
    }
}

// Pré-carrega o áudio principal
function preloadSpiderSound() {
    if (!spiderAudio) {
        spiderAudio = new Audio('https://archive.org/download/spider-web_1_202504/spider-web_1.mp3');
        spiderAudio.preload = 'auto';
        spiderAudio.volume = 0.7;
        
        spiderAudio.addEventListener('canplaythrough', () => {
            isAudioReady = true;
            console.log('Áudio pronto para reprodução');
        });
        
        spiderAudio.addEventListener('error', () => {
            console.error('Erro ao carregar o áudio');
        });
    }
}

// Chame esta função no carregamento da página
preloadSpiderSound();

function playSpiderSound() {
    if (!isAudioReady || !spiderAudio) {
        console.warn('Áudio ainda não está pronto');
        return;
    }

    try {
        spiderAudio.currentTime = 0;
        const playPromise = spiderAudio.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error('Reprodução bloqueada:', error);
            });
        }
    } catch (error) {
        console.error('Erro na reprodução:', error);
    }
}

// Função para trocar de tela com áudio
function mostrarTelaComSom(id) {
    playSpiderSound();
    mostrarTela(id);
}

// Lista de SPIDERS (heróis)
const spiders = [
    { id: 1, nome: "Homem Aranha (Insomniac)", img: "https://i.postimg.cc/vmGy5f9y/Spider-Man-from-MSM-render.webp", selecionado: false },
    { id: 2, nome: "Homem Aranha (Andrew Garfield)", img: "https://i.postimg.cc/YS7FgnbS/df4bajc-2c8eca60-7143-45ba-8355-05fa5a7b84a4.png", selecionado: false },
    { id: 3, nome: "Spider Gwen", img: "https://i.postimg.cc/FKchCCnN/fixed-which-gwen-stacy-spider-woman-outfit-is-better-v0-q8nlf4ak6sxb1.webp", selecionado: false },
    { id: 4, nome: "Homem Aranha (Miles Morales)", img: "https://i.postimg.cc/BQ1Pz9z6/pngkey-com-wish-png-7995924.png", selecionado: false },
    { id: 5, nome: "Homem Aranha (Lego)", img: "https://i.postimg.cc/rw108GM2/pngwing-com-4.png", selecionado: false },
    { id: 6, nome: "Homem Aranha Simbionte", img: "https://i.postimg.cc/FHnZXVg4/clipart626887.png", selecionado: false },
    { id: 7, nome: "Homem Aranha (MCU)", img: "https://i.postimg.cc/25pDWFjJ/spider-man-2nd-homemade-suit-nwh-png11-by-iwasboredsoididthis-dfy46go-pre.png", selecionado: false },
    { id: 8, nome: "Homem Aranha (Tobey Maguire)", img: "https://i.postimg.cc/G201ChPh/pngimg-com-spider-man-PNG34.png", selecionado: false },
  { id: 9, nome: "Homem Aranha 2099", img: "https://i.postimg.cc/CMJS2qJB/spider-man-2099-render-by-kiss-and-kancer-defqomh-pre.png", selecionado: false },
  { id: 10, nome: "Homem Aranha Superior", img: "https://i.postimg.cc/Yq9B2t7r/klipartz-com-1.png", selecionado: false },
{ id: 11, nome: "Silk", img: "https://i.postimg.cc/Zn52qx17/Silk-Dialogue-1.webp", selecionado: false },
{ id: 12, nome: "Venom", img: "https://i.postimg.cc/gJX4tBbP/pngimg-com-venom-PNG41.png", selecionado: false },
  ];
  
  // Lista de Vilões 
  const viloes = [
    { nome: "Venom (variante)"},
    { nome: "Morbius"},
    { nome: "Duende Verde"},
    { nome: "Doutor Octopus"},
    { nome: "Mysterio"},
    { nome: "Electro"},
    { nome: "Homem Areia"},
    { nome: "Abutre"},
    { nome: "Kraven"},
    { nome: "Carnificina"},
    { nome: "Rhino"},
      { nome: "Lagarto"},
      { nome: "Escorpião"},
      { nome: "Camaleão"},
      { nome: "Rei do Crime"},
      { nome: "Senhor Negativo"},
      { nome: "Chacal"},
      { nome: "Morlun"},
      { nome: "Duende Macabro"},
      { nome: "Tombstone"},  
    { nome: "Shocker"},  
    { nome: "Hydroman"},
      { nome: "Tarântula"},
      { nome: "Scream"},
    { nome: "Spot"},
    { nome: "Hammerhead"},
  ];

// Função para trocar telas
function mostrarTela(id) {
    document.querySelectorAll('.tela').forEach(tela => {
        tela.classList.remove('ativa');
    });
    document.getElementById(id).classList.add('ativa');
}

// Função principal do jogo
function jogar(spiderId) {
    const container = document.getElementById('resultado-container');
    if (!container) {
        console.error('Container não encontrado!');
        return;
    }
    
    const spiderSelecionado = spiders.find(s => s.id === spiderId);
    if (!spiderSelecionado) {
        console.error('Spider não encontrado!');
        return;
    }
    
    let forcaSpider = Math.floor(Math.random() * 60) + 1;
    let viloesEscolhidos = [];
    let forcaViloes = 0;
    
    // Seleciona 6 vilões aleatórios
    const viloesCopia = [...viloes];
    for (let i = 0; i < 6 && viloesCopia.length > 0; i++) {
        const indice = Math.floor(Math.random() * viloesCopia.length);
        const vilao = viloesCopia.splice(indice, 1)[0];
        viloesEscolhidos.push(vilao.nome);
        forcaViloes += Math.floor(Math.random() * 10) + 1;
    }
    
    const vitoria = forcaSpider > forcaViloes;
    const derrota = forcaSpider < forcaViloes;
    const empate = forcaSpider === forcaViloes;
    
    // Gera resultado
    let resultadoHTML = `
        <div>
            <h1 class="${vitoria ? 'vitoria' : derrota ? 'derrota' : 'empate'}">
                ${vitoria ? `Você Venceu!!<br>${spiderSelecionado.nome} salvou o dia!` 
                 : derrota ? `Você Perdeu!!<br>${spiderSelecionado.nome} não foi forte o bastante...` 
                 : `Empate!!<br>${spiderSelecionado.nome} venceu, mas o preço para derrotar os vilões foi sua vida...`}
            </h1>
            
            <p><strong>Força do Spider:</strong> ${forcaSpider}</p>
            
            <h2>Sexteto Sinistro</h2>
            <h3>${viloesEscolhidos.join(', ')}</h3>
            <p><strong>Força combinada dos vilões:</strong> ${forcaViloes}</p>
            
            ${derrota ? 
                `<img src="https://i.postimg.cc/LsNgq0Cp/65628664-9c4f-44dd-8d24-91e45a9b722d.jpg" style="  border-radius: 8px; max-width: 400px; margin: 20px auto; display: block;">` 
                : empate ?
                `<img src="https://i.postimg.cc/sxWJVbsJ/hq720.jpg" style="  border-radius: 8px; max-width: 400px; margin: 20px auto; display: block;">`
                :
                `<img src="${spiderSelecionado.img}" style="max-width: 300px; margin: 10px auto; display: block;">`
            }
        </div>
    `;
  container.innerHTML = resultadoHTML;
  
        // Lógica especial para o Homem-Aranha Simbionte 
    if (derrota && spiderSelecionado.nome.toLowerCase().includes('simbionte')) {
        spiderSimbionteDerrotado = true;
        
        // Configura o áudio especial
        musicaSimbionte = new Audio('https://archive.org/download/spider-web_1_202504/Insomniac_s%20Spider-Man%202%20_The%20Spider_%20Is%20Mine_%20Symbiote%20Edit%20__%20DON_T%20STOP%28MP3_160K%29_1.mp3');
        musicaSimbionte.loop = true;
        
        // Configura o observer para controlar o áudio
        const container4 = document.getElementById('tela4');
        const observerSimbionte = new MutationObserver(() => {
            if (container4.classList.contains('ativa')) {
                const tryPlay = () => {
                    musicaSimbionte.play()
                        .then(() => container4.removeEventListener('click', tryPlay))
                        .catch(e => console.log("Autoplay bloqueado:", e));
                };
                tryPlay();
                container4.addEventListener('click', tryPlay);
            } else {
                musicaSimbionte.pause();
            }
        });
        observerSimbionte.observe(container4, { attributes: true });
    } else {
        spiderSimbionteDerrotado = false;
    }

    // Lógica especial para o Venom (nova, espelhando a do Simbionte)
    if (derrota && spiderSelecionado.nome.toLowerCase().includes('venom')) {
        venomDerrotado = true;
        
        // Configura o áudio especial
        musicaVenom = new Audio('https://archive.org/download/we-are-venom-marvel-rivals-edit-marvel-venom-shorts-mp-3-160-k/_WE%20ARE%20VENOM_%20_%20MARVEL%20RIVALS%20EDIT%20_marvel%20_venom%20_shorts%28MP3_160K%29.mp3');
        musicaVenom.loop = true;
        
        // Configura o observer para controlar o áudio
        const container5 = document.getElementById('tela5');
        const observerVenom = new MutationObserver(() => {
            if (container5.classList.contains('ativa')) {
                const tryPlay = () => {
                    musicaVenom.play()
                        .then(() => container5.removeEventListener('click', tryPlay))
                        .catch(e => console.log("Autoplay bloqueado:", e));
                };
                tryPlay();
                container5.addEventListener('click', tryPlay);
            } else {
                musicaVenom.pause();
            }
        });
        observerVenom.observe(container5, { attributes: true });
    } else {
        venomDerrotado = false;
    }
  
   // Lógica especial para o Tobey
    if (derrota && spiderSelecionado.nome.toLowerCase().includes('tobey')) {
        tobeyDerrotado = true;
        
        // Configura o áudio especial
        musicaTobey = new Audio('https://ia801501.us.archive.org/34/items/spider-man-black-suit-theme-bully-maguire-theme-epic-version-spider-man-3-soundtrack-mp-3-160-k-1/Spider-Man_%20Black%20Suit%20Theme%20%28Bully%20Maguire%20Theme%29%20_%20EPIC%20VERSION%20%28Spider-Man%203%20Soundtrack%29%28MP3_160K%29_1.mp3');
        musicaTobey.loop = true;
        
        // Configura o observer para controlar o áudio
        const container6 = document.getElementById('tela6');
        const observerTobey = new MutationObserver(() => {
            if (container6.classList.contains('ativa')) {
                const tryPlay = () => {
                    musicaTobey.play()
                        .then(() => container6.removeEventListener('click', tryPlay))
                        .catch(e => console.log("Autoplay bloqueado:", e));
                };
                tryPlay();
                container6.addEventListener('click', tryPlay);
            } else {
                musicaTobey.pause();
            }
        });
        observerTobey.observe(container6, { attributes: true });
    } else {
        tobeyDerrotado = false;
    }


    mostrarTela('tela3');
}



// Inicialização dos eventos
window.addEventListener('DOMContentLoaded', () => {
    // Configura o botão da tela3
    const botaoTela3 = document.querySelector('#tela3 .button1');
    if (botaoTela3) {
        botaoTela3.onclick = handleTela3Button;
    }
    
    // Configura o botão da tela4 (Simbionte)
    const botaoTela4 = document.querySelector('#tela4 .button2');
    if (botaoTela4) {
        botaoTela4.onclick = () => {
            if (musicaSimbionte) {
                musicaSimbionte.pause();
                musicaSimbionte.currentTime = 0;
            }
            mostrarTelaComSom('tela1');
        };
    }
    
    // Configura o botão da tela5 (Venom) - Novo
    const botaoTela5 = document.querySelector('#tela5 .button2');
    if (botaoTela5) {
        botaoTela5.onclick = () => {
            if (musicaVenom) {
                musicaVenom.pause();
                musicaVenom.currentTime = 0;
            }
            mostrarTelaComSom('tela1');
        };
    }
  
   // Configura o botão da tela6 (tobey) - Novo
    const botaoTela6 = document.querySelector('#tela6 .button2');
    if (botaoTela6) {
        botaoTela6.onclick = () => {
            if (musicaTobey) {
                musicaTobey.pause();
                musicaTobey.currentTime = 0;
            }
            mostrarTelaComSom('tela1');
        };
    }
});