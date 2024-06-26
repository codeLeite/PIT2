$(document).on('ready', async function() { 
  $('#data-nasc').mask('00/00/0000', {placeholder: 'dd/mm/aaaa' });
  const dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'))
  $('#nome').val(`${dadosUsuario.nome} ${dadosUsuario.sobrenome}`)
  
  if(`${dadosUsuario.genero}` === 'M'){
    $('#genero').val("Masculino")
    $('.form-campo-hips').addClass('hidden')
  } else {
    $('#genero').val("Feminino")
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
    "pesoAtual": $('#peso').val(),
    "nutricionista": {
      "nutricionistaId": $('#nutricionistas').val()
    }
  }
  const bodyMedidas =
    {
      "clienteId": dadosUsuario.cliente.id,
      "altura": $('#altura').val(),
      "peso": $('#peso').val(),
      "circunferenciaQuadril": $('#circHips').val() || undefined,
      "circunferenciaCintura": $('#circWaist').val(),
      "circunferenciaPescoco": $('#circNeck').val(),
    }
  const response = await $.post('https://pit2-api.pd8edx.easypanel.host/api/usuario/cliente/solicitardieta',body)
  alert(response.message)
  const responseMedidas = await $.post('https://pit2-api.pd8edx.easypanel.host/api/medidas',bodyMedidas)
  alert(responseMedidas.message)
  window.location.href = './anamnese-user.html'
})
