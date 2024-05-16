$(document).on('ready', async function(){
  const clientesPendentes = await $.get('https://pit2-api.pd8edx.easypanel.host/api/nutricionista/clientes/pendentes/1')

  for(const {dieta} of clientesPendentes){
    const template = $($('#template-cliente').html()).clone()

    script.find(".id").text(dieta.cliente.id)
    script.find(".nome").text(`${dieta.cliente.usuario.nome} ${dieta.cliente.usuario.sobrenome}`)
    script.find(".id").text(dieta.objetivoFoco)
    script.find(".id").text(new Date(dieta.dataCriacao).toLocaleString('pt-BR'))

    $("#table#tabela-pendentes tbody").append(template.html())
  }
})