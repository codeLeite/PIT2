$(document).on('ready', async function () {
  const dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'))
  const listaClientes = await $.ajax({
    url: `https://pit2-api.pd8edx.easypanel.host/api/nutricionista/clientes/${dadosUsuario.nutricionista.id}`
  })

  listaClientes.forEach(({ dieta }) => {
    const tr = criarTr(
      dieta.cliente.id,
      `${dieta.cliente.usuario.nome} ${dieta.cliente.usuario.sobrenome}`,
      dieta.objetivoFoco,
      new Date(dieta.dataCriacao).toLocaleString('pt-BR'),
      '<i class="fa-solid fa-eye"></i>'
    )

    $(tr).appendTo($('#tabela-cliente tbody'))
  })
})

function criarTr(...obj) {
  let linha = '<tr>\n'

  obj.forEach(o => {
    linha += `<td>${o}</td>\n`
  })

  linha += '</tr>'

  return linha
}