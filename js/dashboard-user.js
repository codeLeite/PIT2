$(document).on('ready', async function() { 
  const dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'))
  let progresso = await $.get(`https://pit2-api.pd8edx.easypanel.host/api/medidas/progresso/cliente/${dadosUsuario.cliente.id}`)
  console.log(progresso.map(progresso => [progresso.dataCriacao, progresso.peso]))
  progresso = progresso.slice(0,7)
  $('#user-name').text(`Olá, ${dadosUsuario.nome} ${dadosUsuario.sobrenome}!`)
  
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  google.charts.setOnLoadCallback(graficoIMC);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Data', 'Peso'],
      ...progresso.map(progresso => [new Date(progresso.dataCriacao).toLocaleDateString('pt-BR'), Number(progresso.peso)])
    ]);

    const chartwidth = $('#grafico').width();  
    var options = {
      title: 'Histórico de Peso',
      curveType: 'function',
      legend: { position: 'bottom' },
      'min-width': chartwidth,
      'max-height': 250, 
      responsive: true
    };

    var chart = new google.visualization.LineChart(document.getElementById('grafico'));

    chart.draw(data, options);
  }

  function graficoIMC() {
    var data = google.visualization.arrayToDataTable([
      ['Data', 'IMC'],
      ...progresso.map(progresso => [new Date(progresso.dataCriacao).toLocaleDateString('pt-BR'), Number(progresso.valorImc)])
    ]);

    const chartwidth = $('#grafico2').width();  
    var options = {
      title: 'Histórico de IMC',
      vAxis: {title: 'IMC'},
      hAxis: {title: 'Data'},
      seriesType: 'bars',
      series: {5: {type: 'line'}},
      'min-width': chartwidth,
      'max-height': 250, 
      responsive: true
    };

    var chart = new google.visualization.ComboChart(document.getElementById('grafico2'));

    chart.draw(data, options);
  }

  $(window).resize(function(){
    drawChart();
    graficoIMC();
  })
})
