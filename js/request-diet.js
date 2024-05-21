$(document).on('ready', async function() { 
  $('#data-nasc').mask('00/00/0000', {placeholder: 'dd/mm/aaaa' });
  const dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'))
  $('#nome').val(`${dadosUsuario.nome} ${dadosUsuario.sobrenome}`)
  
  if(`${dadosUsuario.genero}` === 'M'){
    $('#genero').val("Masculino")
  } else {
    $('#genero').val(`${dadosUsuario.genero}`)
  }
  
  $('#data-nasc').val(`${dadosUsuario.dataNascimento}`)
  const listaNutricionistas = await $.ajax({
    url: 'https://pit2-api.pd8edx.easypanel.host/api/nutricionista/'
  })

  listaNutricionistas.forEach((nutricionista) => {
    const option = `<option value='${nutricionista.id}'>${nutricionista.id} - ${nutricionista.usuario.nome} ${nutricionista.usuario.sobrenome}</option>`
    $(option).appendTo($('#nutricionistas'))
  })
})

$('#form-request').on('submit', async function(e){
  e.preventDefault()
  const dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'))
  const body = {
    "clienteId": dadosUsuario.cliente.id,
    "objetivoFoco": $('#tipo-dieta option:selected').text(),
    "nutricionista": {
      "nutricionistaId": $('#nutricionistas').val()
    }
  }
  const bodyMedidas =
    {
      "clienteId": dadosUsuario.cliente.id,
      "altura": $('#altura').val(),
      "peso": $('#peso').val()
    }
  const response = await $.post('https://pit2-api.pd8edx.easypanel.host/api/usuario/cliente/solicitardieta',body)
  alert(response.message)
  const responseMedidas = await $.post('https://pit2-api.pd8edx.easypanel.host/api/medidas',bodyMedidas)
  alert(responseMedidas.message)
})
