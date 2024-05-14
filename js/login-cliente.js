$('#form-login-cliente').on('submit', e => {
  e.preventDefault()
  const email = $('#email').val()
  const senha = $('#senha').val()

  $.ajax({
    url: 'https://pit2-api.pd8edx.easypanel.host/usuario/cliente/login',
    method: 'post',
    data: { email, senha },
    dataType: 'json',
    success: function (result) {
      const dadosUsuario = JSON.stringify(result)
      localStorage.setItem('dadosUsuario', dadosUsuario)

      alert(`Bem vindo ao sistema, ${result.nome} ${result.sobrenome}`)
      window.location.href = './dashboard-user.html'
    },
    error: function (error) {
      const result = JSON.parse(error.responseText)
      alert('Erro: ' + result.message)
    }
  })
})