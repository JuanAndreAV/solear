// Datos ficticios para los gráficos
let datos = []
const barChartData = {
    labels: ['1965', '2000', '2018', '2019', '2020','2022'],
    datasets: [{
      label: 'Producción (GWh)',
      data: [0, 0.010000, 0.020000, 0.130000, 0.190000,0.320000],
      backgroundColor: ['#2196f3', '#ffeb3b','#228331' , '#9c27b0','#4caf50'],
    }]
  };
  
  const pieChartData = {
    labels: ['1965', '2000', '2018', '2019', '2020','2022'],
    datasets: [{
      data: [0, 0.010000, 0.020000, 0.130000, 0.190000,0.320000],
      backgroundColor: ['#2196f3', '#ffeb3b','#228331' , '#9c27b0','#4caf50'],
    }] 
  };
  

  
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
    
    const torta = document.getElementById('pieChart').getContext('2d');
    new Chart(torta, {
      type: 'pie',
      data: pieChartData,
      options: {
        responsive: true,
      },
    });
  
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
 const interpretacion = document.getElementById('interpretacion')
  
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
    let capacidadInstalada = capacidadSolar(consumo, horas);
    let capacidadPanel = 0.35;
    let cantidadPaneles = Math.ceil(capacidadInstalada / capacidadPanel);//capacidadInstalada / potencia de un panel solar 350w(0.35kw) ej: 600 / 0.35
    
      
      if (consumo > 0){
        tabla.innerHTML = `<td>${consumo} kwh</td><td>${horas} horas</td><td>${capacidadInstalada.toFixed(2)} kw</td><td>${cantidadPaneles.toFixed(0)} paneles</td>` ;  
        interpretacion.innerHTML = `<div class="card mt-4">
  <div class="card-header">
    <h5>¿Cómo interpretar los resultados?</h5>
  </div>
  <div class="card-body">
    <ul>
      <li>
        <strong>Consumo Mensual (kWh):</strong> Energía que consumes en promedio cada mes, medida en kilovatios-hora (kWh). Este dato lo puedes encontrar en tu factura eléctrica.
      </li>
      <li>
        <strong>Horas de Sol Pleno:</strong> Promedio de horas diarias en las que la radiación solar es máxima en tu ubicación. Depende de las condiciones climáticas y geográficas.
      </li>
      <li>
        <strong>Potencia Máxima Total o Capacidad Instalada (kWp):</strong> Potencia que debería tener tu sistema solar para cubrir tu consumo mensual bajo condiciones ideales de radiación solar.
      </li>
      <li>
        <strong>Cantidad de Paneles:</strong> Número estimado de paneles solares necesarios para generar la energía que consumes. Cada panel tiene una capacidad estándar de 350 Wp (0.35 kWp).
      </li>
    </ul>
    <p class="mt-3">
      <em>Ejemplo:</em> Si tu consumo mensual es de <strong>300 kWh</strong> y tienes un promedio de <strong>5 horas de sol pleno</strong> por día, necesitarías una capacidad instalada de <strong>2.5 kWp</strong>, lo que equivale a aproximadamente <strong>8 paneles solares</strong>.
    </p>
  </div>
</div>`
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
  