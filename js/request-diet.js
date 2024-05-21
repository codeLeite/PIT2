$(document).on('ready', async function() { 
  const dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'))
  $('#nome').val(`${dadosUsuario.nome} ${dadosUsuario.sobrenome}`)
  const listaNutricionistas = await $.ajax({
    url: 'https://pit2-api.pd8edx.easypanel.host/api/nutricionista/'
  })

  listaNutricionistas.forEach((nutricionista) => {
    const option = `<option value='${nutricionista.id}'>${nutricionista.id} - ${nutricionista.usuario.nome} ${nutricionista.usuario.sobrenome}</option>`
    $(option).appendTo($('#nutricionistas'))
  })
})

$(document).on('submit', async function(){
  const dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'))
  
})
