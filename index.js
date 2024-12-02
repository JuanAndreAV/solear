// Datos ficticios para los gráficos
let datos = []
const barChartData = {
    labels: ['Eólica','Hidroeléctrica', 'Solar','Geotérmica'],
    datasets: [{
      label: 'Producción (GWh)',
      data: [0,0,0,0],
      backgroundColor: ['#4caf50', '#ffeb3b', '#2196f3', '#9c27b0'],
    }]
  };
  
  const pieChartData = {
    labels: ['Eólica','Hidroeléctrica', 'Solar','Geotérmica'],
    datasets: [{
      data: datos,
      backgroundColor: ['#9c27b0', '#2196f3', '#ffeb3b','#4caf50'],
    }] 
  };
  

  
  const lineChartData = {
    labels: ['2018', '2019', '2020', '2021', '2022'],
    datasets: [{
      label: 'Capacidad Eólica',
      data: [200, 250, 300, 350, 400],
      borderColor: '#4caf50',
      fill: false,
    }, {
      label: 'Capacidad Solar',
      data: [100, 120, 150, 180, 210],
      borderColor: '#ffeb3b',
      fill: false,
    }, {
      label: 'Capacidad Hidroeléctrica',
      data: [300, 310, 320, 330, 350],
      borderColor: '#2196f3',
    
      fill: false,
    }]
  };
  
  // Inicializar gráficos
  function renderCharts() {
    const barras = document.getElementById('barChart').getContext('2d');
    new Chart(barras, {
      type: 'bar',
      data: barChartData,
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
      },
    });
    
    // const torta = document.getElementById('pieChart').getContext('2d');
    // new Chart(torta, {
    //   type: 'pie',
    //   data: pieChartData,
    //   options: {
    //     responsive: true,
    //   },
    // });
  
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    new Chart(lineCtx, {
      type: 'line',
      data: lineChartData,
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
      },
    });
  }

 
  const boton = document.getElementById('btn-calcular');
  const contenedor = document.getElementById('container');
  const capacidadesRenovables = {
    'Eólica': 10,
    'Hidroeléctrica': 20,
    'Solar': 5,
    'Geotérmica': 15
  };
  
  
  let chartInstance;
  boton.addEventListener('click',()=>{
    contenedor.innerText =""
    let formulario = parseFloat(document.getElementById('consumoElectrico').value);
   
    let capacidadInstalada = 0;
    let tipoRenovable = []
    
      for (let fuente in capacidadesRenovables) {
        capacidadInstalada += capacidadesRenovables[fuente]
        datos.push((capacidadInstalada / formulario) * 100)
        tipoRenovable.push(fuente)
       
      }
      
      
      datos.forEach((item,index)=>{
        contenedor.innerHTML += `
      <td>${tipoRenovable[index]}</td>
      <td>${item.toFixed(2)}%</td>`
        
      }) 
      
    
    
    if (chartInstance) {
      chartInstance.data = pieChartData;
      chartInstance.update(); // Actualizar el gráfico existente
    } else {
      const torta = document.getElementById('pieChart').getContext('2d');
      chartInstance = new Chart(torta, {
        type: 'pie',
        data: pieChartData,
        options: {
          responsive: true,
        },
      });
    }
    datos.length = 0;
    tipoRenovable.length =0
    
  })
 
 
  // Renderizar gráficos al cargar la página
 document.addEventListener('DOMContentLoaded', renderCharts);
  