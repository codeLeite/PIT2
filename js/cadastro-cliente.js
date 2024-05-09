$(document).ready(function () {
  $('#telefone').mask('(00) 00000-0000')

  $('#cadastro-cliente').validate({
    rules: {
      nome: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      telefone: {
        required: true
      },
      cpf: {
        required: true
      },
      endereco: {
        required: true
      },
      cep: {
        required: true
      },
      senha: {
        required: true
      },
      'conf-senha': {
        required: true
      }
    },
    messages: {
      nome: 'Por favor, insira o seu nome',
      telefone: 'Por favor, insira seu telefone',
      email: 'Por favor, insira um email válido',
      cpf: 'Por favor, insira seu CPF',
      endereco: 'Por favor, insira seu endereço',
      cep: 'Por favor, insira seu CEP',
      senha: 'Por favor, digite a senha',
      'conf-senha': 'Por favor, confirme a senha'
    },
    submitHandler: function (form) {
      console.log(form)
      // $(form).submit()
    },
    errorPlacement: function (error, element) {
      const elementoPai = $(element).parents('div.input-container')
      console.log(elementoPai)
      $(error).insertAfter(elementoPai)
    },
    invalidHandler: function (evento, validador) {
      let camposIncorretos = validador.numberOfInvalids()
      console.log()
    }
  })

  $('#cadastro-cliente').on('submit', e => {
    e.preventDefault()
    console.log('submit')
  })
})