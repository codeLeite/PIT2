$(document).on('ready', async function () {
  let idRegistro = 0
  let idCliente = 0
  let idDieta = 0
  const dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'))
  const listaAlimentos = await $.get('https://pit2-api.pd8edx.easypanel.host/api/alimento/')

  await carregarTabela()

  $('#adicionar-registro').on('click', adicionarRegistro)
  $('#close-modal').on('click', closeModal)

  async function modalDieta(dietaId, userId, tipoPerfil) {
    if (idCliente !== userId){
      $('#tabela-alimentos tbody tr').remove()
    }
    idCliente = userId
    idDieta = dietaId
    $("#perfil").text('Tipo Perfil: '+tipoPerfil)
    const modal = document.getElementById('modal').classList.add('visible')
    console.log(modal)
  }

  async function closeModal(){
    const modal = document.getElementById('modal').classList.remove('visible')
  }

  $('#enviar-dieta').on('click', async function () {
    const alimentos = []
    $('#tabela-alimentos tbody tr').map((_, value) => {
      const registroAlimento = {
        alimentoId: $(value).find('.select-options').val(),
        horario: new Date(`1970-01-01T${$(value).find('.horario').val()}:00Z`).toISOString(),
        pesoGramas: $(value).find('.quantidade').val()
      }

      alimentos.push(registroAlimento)
    })

    const bodyModal = {
      clienteId: idCliente,
      // dietaId: idDieta,
      objetivoFoco: 'Mudar de vida',
      dietaAtual: true,
      alimentos: alimentos,
      nutricionista: {
        nutricionistaId: dadosUsuario.nutricionista.id
      }
    }
    const response = await $.post(`https://pit2-api.pd8edx.easypanel.host/api/dieta/`, bodyModal)
    alert(response.message)
  })

  async function adicionarRegistro() {
    const template = $($('#template-dieta').html()).clone()
    $(template).attr('id', `linha-${idRegistro++}`)
    await carregarAlimentos($(template).find('select#select-options'))
    $(template).find('.excluir').on('click', excluirLinha)
    $(template).find('.quantidade').on('blur', calcularInfo)
    $('#tabela-alimentos tbody').append(template)
  }

  function excluirLinha(e) {
    $(e.target).parents('tr').remove()
  }

  async function carregarTabela() {
    const clientesPendentes = await $.get(
      `https://pit2-api.pd8edx.easypanel.host/api/nutricionista/clientes/pendentes/${dadosUsuario.nutricionista.id}`
    )
    for (const { dieta } of clientesPendentes) {
      const template = $($('#template-cliente').html()).clone()

      template.find('.id').text(dieta.cliente.id)
      template.find('.nome').text(`${dieta.cliente.usuario.nome} ${dieta.cliente.usuario.sobrenome}`)
      template.find('.objetivoFoco').text(dieta.objetivoFoco)
      template.find('.solicitacao').text(new Date(dieta.dataCriacao).toLocaleString('pt-BR'))
      template
        .find('.send-diet')
        .attr('diet-id', dieta.id)
        .on('click', _ => modalDieta(dieta.id, dieta.cliente.id, dieta.cliente.tipoPerfil))
      $('table#tabela-pendentes tbody').append(template)
    }
  }

  async function carregarAlimentos(seletor) {
    $(seletor).append(`<option value=''>Escolha seu alimento...</option>`)
    for (const alimento of listaAlimentos) {
      $(seletor).append(`<option value='${alimento.id}'>${alimento.nome}</option>`)
    }
  }

  async function calcularInfo(){
    const alimento = $($(this).parents('tr')).find('select.select-options').val()
    const quantidade = $($(this).parents('tr')).find('input.quantidade').val()
    const alimentoNaLista = listaAlimentos.filter(e => e.id == alimento)[0]
    const calculo = {
      calorias: ((alimentoNaLista.calorias/100)*quantidade).toFixed(2),
      carboidratos: ((alimentoNaLista.carboidratos/100)*quantidade).toFixed(2),
      proteinas: ((alimentoNaLista.proteinas/100)*quantidade).toFixed(2),
      gorduras: ((alimentoNaLista.gorduras/100)*quantidade).toFixed(2)
    }
    // if($('#calorias-totais').text() === '') $('#calorias-totais').text(calculo.calorias)
    // else $('#calorias-totais').text(calculo.calorias + parseFloat($('#calorias-totais').text()))
    const caloriasAtuais = parseFloat($('#calorias-totais').text()) || 0;
    const novasCalorias = caloriasAtuais + parseFloat(calculo.calorias);
    $('#calorias-totais').text(novasCalorias)
    const carboidratosAtuais = parseFloat($('#carboidratos-totais').text()) || 0;
    const novosCarboidratos = carboidratosAtuais + parseFloat(calculo.carboidratos);
    $('#carboidratos-totais').text(novosCarboidratos)
    const proteinasAtuais = parseFloat($('#proteinas-totais').text()) || 0;
    const novasProteinas = proteinasAtuais + parseFloat(calculo.proteinas);
    $('#proteinas-totais').text(novasProteinas)
    const gordurasAtuais = parseFloat($('#gorduras-totais').text()) || 0;
    const novasGorduras = gordurasAtuais + parseFloat(calculo.gorduras);
    $('#gorduras-totais').text(novasGorduras)
  }
})
