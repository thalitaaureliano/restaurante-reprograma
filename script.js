const container = document.querySelector('#items-cardapio')
 fetch(`http://localhost:5400/comidas`)
     .then((response) =>{
         return response.json();
     })
     .then((data) =>{

        data.forEach(prato => {
            console.log(prato)

            const mediaItem = document.createElement('div');
            mediaItem.setAttribute('class', 'media mb-4');
            mediaItem.innerHTML = `
            <img src="${prato.imagem}" alt="${prato.nome}" class="mr-3 img-thumbnail" width="200px">

            <div class="media-body>

                <h5 class="mt-0"><strong>${prato.nome}</strong></h5>
                ${prato.descricao}
              </div>`
              container.appendChild(mediaItem);
              const buttonDelete = document.createElement("button")
              buttonDelete.textContent = "Remover"
              buttonDelete.setAttribute("class", "btn btn-info")
              buttonDelete.setAttribute("data-id", prato._id)
              mediaItem.appendChild(buttonDelete)
              buttonDelete.addEventListener( 'click', () => {
                fetch(
                  `http://localhost:5400/comidas/${prato._id}`,
                  {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                ).then((response) => {
                  window.location.reload()
                })
                

              })
        }
        )
     }
     )
     .catch((erro)=>{
         console.log(erro)
     })

     
const botao = document.querySelector('#criar_comida_button')
botao.addEventListener("click", criarComida)

function criarComida () {
  const nome = document.querySelector("#nome_input").value
  const descricao = document.querySelector("#descricao_input").value
  const imagem = document.querySelector("#imagem_input").value
  const comida = {
    nome, descricao, imagem
  }
  fetch(
    'http://localhost:5400/comidas',
    {
      method: 'POST',
      body: JSON.stringify(comida),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(response => console.log("criou!"))
}

