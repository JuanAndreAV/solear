// Datos ficticios para los gráficos
let datos = []
// const barChartData = {
//     labels: ['Eólica','Hidroeléctrica', 'Solar','Geotérmica'],
//     datasets: [{
//       label: 'Producción (GWh)',
//       data: [0,0,0,0],
//       backgroundColor: ['#4caf50', '#ffeb3b', '#2196f3', '#9c27b0'],
//     }]
//   };
  
//   const pieChartData = {
//     labels: ['Eólica','Hidroeléctrica', 'Solar','Geotérmica'],
//     datasets: [{
//       data: datos,
//       backgroundColor: ['#9c27b0', '#2196f3', '#ffeb3b','#4caf50'],
//     }] 
//   };
  

  
  const lineChartData = {
    labels: ['1965', '2000', '2018', '2019', '2020','2022'],
    datasets: [
      {
      label: 'Consumo Energía Solar en Colombia',
      data: [0, 0.010000, 0.020000, 0.130000, 0.190000,0.320000],
      borderColor: '#ffeb3b',
      fill: false,
    }]
  };
  
  // Inicializar gráficos
  function renderCharts() {
    // const barras = document.getElementById('barChart').getContext('2d');
    // new Chart(barras, {
    //   type: 'bar',
    //   data: barChartData,
    //   options: {
    //     responsive: true,
    //     plugins: {
    //       legend: { display: true },
    //     },
    //   },
    // });}
    
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
  const tabla = document.getElementById('datosFilas');
  const mensaje = document.getElementById('validacion')
 
  
  function capacidadSolar(consumoMensual, horasSol){
    let capacidad =  consumoMensual / ( horasSol * 30 * 0.8);//80% de eficiencia factor (0.8)
    return capacidad
  };

  //console.log("resultado:",capacidadSolar(219,5))
  
  let chartInstance;

  boton.addEventListener('click',()=>{
    tabla.innerText =""
    let consumo = parseFloat(document.getElementById('consumoElectrico').value);
    let horas = parseInt(document.getElementById("horas").value);
    console.log(horas)
    let capacidadInstalada = capacidadSolar(consumo, horas);
    let cantidadPaneles = capacidadInstalada / 0.35;//capacidadInstalada / potencia de un panel solar 350w(0.35kw) ej: 600 / 0.35
    
      
      if (consumo > 0){
        tabla.innerHTML = `<td>${consumo} kwh</td><td>${horas} horas</td><td>${capacidadInstalada.toFixed(2)} kw</td><td>${cantidadPaneles.toFixed(0)} paneles</td>`
        mensaje.innerText = ""
      }else{
        mensaje.style.color = "red"
        mensaje.innerText = "Consumo debe ser mayor a 0."
      }
      // datos.forEach((item,index)=>{
      //   tabla.innerHTML += `
      // <td>${tipoRenovable[index]}</td>
      // <td>${item.toFixed(2)}%</td>`
        
      // }) 
      
    
    
    // if (chartInstance) {
    //   chartInstance.data = pieChartData;
    //   chartInstance.update(); // Actualizar el gráfico existente
    // } else {
    //   const torta = document.getElementById('pieChart').getContext('2d');
    //   chartInstance = new Chart(torta, {
    //     type: 'pie',
    //     data: pieChartData,
    //     options: {
    //       responsive: true,
    //     },
    //   });
    // }
    datos.length = 0;
    tipoRenovable.length =0
    
  })
 
 
  // Renderizar gráficos al cargar la página
 document.addEventListener('DOMContentLoaded', renderCharts);
  