  // ============= FUNÇÃO DE NOTICIAS ====================

const apiKey = 'eb2e63574f8f4f06be3077072e447c60'; // Substitua pelo seu próprio API key da NewsAPI

// Função para buscar notícias atualizadas
function fetchNews() {
    const newsCarousel = $('#news-carousel');

    // Limpar o conteúdo do carrossel de notícias
    newsCarousel.empty();

    const keywords = ['tributo trabalhista ', 'direito trabalhista ', 'consultor jurídico', 'Trabalho' , 'tributação' , 'previdênciária']
    // Palavras-chave para buscar notícias

    // Fazer a solicitação à API da NewsAPI
    keywords.forEach(async keyword =>{
      await fetch(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`)
          .then(response => response.json())
          .then(data => {
        // Verificar se a solicitação foi bem-sucedida
            if (data.status === 'ok') {
             const articles = data.articles;
          
          // Iterar sobre as notícias retornadas e adicionar aos slides do carrossel
                articles.forEach(article => {
                    const slide = $('<div>').addClass('item');
                    const img = $('<img>').attr('src', article.urlToImage).attr('alt', article.title);
                    const title = $('<h3>').text(article.title);
                    const description = $('<p>').text(article.description);
                    const link = $('<a>').attr('href', article.url).attr('target', '_blank').text('Leia mais');
                    
                    slide.append(img, title, description, link);
                    newsCarousel.append(slide);
                  });
                  
                  // Inicializar o carrossel com as configurações desejadas
                  newsCarousel.owlCarousel({
                      loop: true,
                      margin: 10,
                      nav: true,
                      dots: false,
                      autoplay: true,
                      autoplayTimeout: 5000,
                      autoplayHoverPause: true,
                      navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
                      responsive: {
                        0: {
                          items: 1
                        },
                        600: {
                          items: 2
                        },
                        1000: {
                          items: 3
                        }
                      }
                    });
                  } else {
                  console.log('Erro ao buscar notícias:', data.message);
                }
              })
              .catch(error => {
                console.log('Erro na solicitação:', error);
              });
              
              
              
            })
              
}
            
// Chamar a função fetchNews() quando a página for carregada
$(document).ready(fetchNews);

// ============= FUNÇÃO DE ESTADOS ====================

function displayStates() {
    const states = ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"];

    

    let content = document.getElementById("content");
    content.innerHTML = "<h2>Estados</h2>";
    
  
    let list = document.createElement("ul");
  
    states.forEach((state) => {
      let item = document.createElement("li");
      item.textContent = state;
      item.addEventListener("click", () => displaySubcategories(state));
      list.appendChild(item);
      item.style.cssText = 'cursor: pointer;'
    });
  
    content.appendChild(list);
  }
  
  function displaySubcategories(state) {
    const subcategories = {
      "Pernambuco": ["ICMS", "ISS", "IPTU"],
      "Acre": ["Descrição Acre","ICMS", "ISS", "IPTU"],
      "Alagoas": ["ICMS", "ISS", "IPTU"]
      // Adicione outras subcategorias para os demais estados, se necessário
    };
  
    let content = document.getElementById("content");
    content.innerHTML = "<h2>Subcategorias</h2>";
  
    if (subcategories[state]) {
      let list = document.createElement("ul");
  
      subcategories[state].forEach((subcategory) => {
        let item = document.createElement("li");
        item.textContent = subcategory;
        item.addEventListener("click", () => redirectToWebsite(`https://www.sefaz.pe.gov.br/Publicacoes/Paginas/Novo-regulamento-do-ICMS.aspx/${state}/${subcategory}`));
        list.appendChild(item);
      });
  
      content.appendChild(list);
    } else {
      content.textContent = "Subcategorias não encontradas para o estado selecionado.";
    }
  }
  
  function redirectToWebsite(url) {
    // Redirecionar para o URL especificado
    window.location.href = url;
  }
  
// ===================CHATBOT=====================

const chatOutput = document.getElementById('chat-output');
const userInput = document.getElementById('user-input');

function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = message;
    chatOutput.appendChild(messageDiv);
}

function sendMessage() {
    const userMessage = userInput.value;
    appendMessage('user', userMessage);

    // Resposta do Chatbot (simples para este exemplo)
    const botMessage = "🤖 Olá! Sou Optimus Prime. Como posso ajudar?";
    setTimeout(() => appendMessage('bot', botMessage), 1000);

    userInput.value = '';
}

userInput.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
