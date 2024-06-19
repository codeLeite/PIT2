$(document).on('ready', async function () {
  const dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'))
  const listaDietas = await $.get(`https://pit2-api.pd8edx.easypanel.host/api/dieta/cliente/${dadosUsuario.cliente.id}`)
  const dadosDieta = listaDietas.find(x => x.dietaAtual)
  const { alimentosDietas } = await $.get(`https://pit2-api.pd8edx.easypanel.host/api/dieta/${dadosDieta.id}`)

  $('#calorias-totais span').text(`${dadosDieta.caloriasTotais}kcal`)
  $('#proteinas-totais span').text(`${dadosDieta.proteinasTotais}g`)
  $('#gorduras-totais span').text(`${dadosDieta.gordurasTotais}g`)
  $('#carboidratos-totais span').text(`${dadosDieta.carboidratosTotais}g`)

  const horarios = agruparAlimentosPorHorario(alimentosDietas)

  for (const { horario, alimentos } of horarios) {
    const templateCard = $($('#template-card').html()).clone()

    templateCard.find('.titulo-card').text(horario)

    for (const { alimento, pesoGramas } of alimentos) {
      const templateRow = $($('#template-row').html()).clone()
      templateRow.find('.nome-alimento').text(alimento.nome)
      templateRow.find('.quantidade-alimento').text(pesoGramas)

      templateCard.find('tbody').append(templateRow)
    }

    $('#lista-cards').append(templateCard)
  }
})

function agruparAlimentosPorHorario(alimentosDietas) {
  const alimentosAgrupados = {}

  alimentosDietas.forEach(item => {
    const horario = item.horario

    // Cria um array para o horário se ainda não existir
    if (!alimentosAgrupados[horario]) {
      alimentosAgrupados[horario] = {
        horario: new Date(horario).toLocaleTimeString(undefined, {
          timeZone: 'America/Sao_Paulo',
          hour12: false,
          minute: '2-digit',
          hour: '2-digit'
        }),
        alimentos: []
      }
    }

    // Adiciona o nome do alimento ao array do horário
    alimentosAgrupados[horario].alimentos.push(item)
  })

  return Object.values(alimentosAgrupados)
}