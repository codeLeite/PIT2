$(document).ready(function () {
  $('#telefone').mask('(00) 00000-0000')
  $('#data-nasc').mask('00/00/0000', {placeholder: 'dd/mm/aaaa' });

  $('#cadastro-nutri').validate({
    rules: {
      nome: {
        required: true
      },
      sobrenome: {
        required: true
      },
      'data-nasc': {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      telefone: {
        required: true
      },
      uf: {
        required: true
      },
      senha: {
        required: true
      },
      'conf-senha': {
        required: true
      },
      genero: {
        required: true
      },
      'crx-id': {
        required: true
      }
    },
    messages: {
      nome: 'Por favor, insira o seu nome',
      sobrenome: 'Por favor, insira o seu sobrenome',
      'data-nasc': 'Por favor, insira a sua data de nascimento',
      telefone: 'Por favor, insira seu telefone',
      email: 'Por favor, insira um email válido',
      uf: 'Por favor, insira sua UF',
      senha: 'Por favor, digite a senha',
      'conf-senha': 'Por favor, confirme a senha',
      genero: 'Por favor, insira o seu gênero',
      'crx-id': 'Por favor, escreva seu ID'
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

    $('#cadastro-nutri').on('submit', async function(){
      const crx = $('#crx').val()
      const body = {
        "email": $('#email').val(),
        "senha": $('#senha').val(),
        "nome": $('#nome').val(),
        "sobrenome": $('#sobrenome').val(),
        "dataNascimento": $('#data-nasc').cleanVal(),
        "genero": $('#genero').val(),
        "telefone": $('#telefone').cleanVal(),
        "nutricionista": {
          "uf": $('#uf').val(),
          [crx]: $('#crx-id').val()
        }
      }

      if(body.senha !== $('#conf-senha').val()){
        return alert('As senhas não conferem')
      }

      const response = await $.post('https://pit2-api.pd8edx.easypanel.host/api/usuario/nutricionista/cadastrar',body)
      alert(response.message)
    })
  })