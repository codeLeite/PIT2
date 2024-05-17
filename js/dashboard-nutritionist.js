$(document).on('ready', async () =>{
  const dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'))
  const clientesPendentes = await $.get(`https://pit2-api.pd8edx.easypanel.host/api/nutricionista/clientes/pendentes/${dadosUsuario.nutricionista.id}`)
  const totalClientes = await $.get(`https://pit2-api.pd8edx.easypanel.host/api/nutricionista/clientes/${dadosUsuario.nutricionista.id}`)

  $('#total-clientes').html(totalClientes.length)
  $('#renda-nutricionista').html('R$ ' +(totalClientes.length*60).toFixed(2).replace(".",","))
  $('#dietas-pendentes').html(totalClientes.filter(cliente => cliente.dieta.novaDieta).length)

  for(const {dieta} of clientesPendentes){
    const template = $($('#template-cliente').html()).clone()

    template.find(".id").text(dieta.cliente.id)
    template.find(".nome").text(`${dieta.cliente.usuario.nome} ${dieta.cliente.usuario.sobrenome}`)
    template.find(".dieta").text(dieta.objetivoFoco)
    template.find(".enviada").text(new Date(dieta.dataCriacao).toLocaleString('pt-BR'))

    $("table#tabela-ultimos tbody").append(template)
  }
})