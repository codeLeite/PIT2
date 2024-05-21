$(document).on('ready', async function() { 
  const dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'))
  $('#user-name').text(`Olá, ${dadosUsuario.nome} ${dadosUsuario.sobrenome}!`)
  
  })
