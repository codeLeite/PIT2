$(document).on('ready', async function(){
  const clientesPendentes = await $.get('https://pit2-api.pd8edx.easypanel.host/api/nutricionista/clientes/pendentes/1')

  for(const {dieta} of clientesPendentes){
    const template = $($('#template-cliente').html()).clone()

    template.find(".id").text(dieta.cliente.id)
    template.find(".nome").text(`${dieta.cliente.usuario.nome} ${dieta.cliente.usuario.sobrenome}`)
    template.find(".objetivoFoco").text(dieta.objetivoFoco)
    template.find(".solicitacao").text(new Date(dieta.dataCriacao).toLocaleString('pt-BR'))

    $("table#tabela-pendentes tbody").append(template.html())
  }
})