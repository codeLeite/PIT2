const toggleForm = (id) => {
  const element = document.getElementById(id)
  element.classList.add('flex')
  element.classList.remove('hidden')
  const selectFormElement = document.getElementById('select-form')
  selectFormElement.classList.remove('flex')
  selectFormElement.classList.add('hidden')

  if(id.includes('user')) {
    document.getElementById('nutri-form').classList.add('hidden')
    document.getElementById('nutri-form').classList.remove('flex')
    document.getElementById('toggle-section').classList.add('user')
    } else {
      document.getElementById('user-form').classList.add('hidden')
      document.getElementById('user-form').classList.add('flex')
      document.getElementById('toggle-section').classList.remove('user')
  }
}

$('#form-login-cliente').on('submit', e => {
  e.preventDefault()
  const email = $('#email').val()
  const senha = $('#senha').val()

  $.ajax({
    url: 'https://pit2-api.pd8edx.easypanel.host/api/usuario/cliente/login',
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

$('#form-login-nutricionista').on('submit', e => {
  e.preventDefault()
  const email = $('#emailn').val()
  const senha = $('#senhan').val()

  $.ajax({
    url: 'https://pit2-api.pd8edx.easypanel.host/api/usuario/nutricionista/login',
    method: 'post',
    data: { email, senha },
    dataType: 'json',
    success: function (result) {
      const dadosUsuario = JSON.stringify(result)
      localStorage.setItem('dadosUsuario', dadosUsuario)

      alert(`Bem vindo ao sistema, ${result.nome} ${result.sobrenome}`)
      window.location.href = './dashboard-nutritionist.html'
    },
    error: function (error) {
      const result = JSON.parse(error.responseText)
      alert('Erro: ' + result.message)
    }
  })
})