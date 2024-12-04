let datosPaises = [];
const tablaPaises = document.getElementById('datosPaises');

fetch("./data/datos.json")
.then((res)=> res.json())
.then((data)=>{
    datosPaises = data;
    let colombia = datosPaises.filter((pais) => pais.Entity === "Colombia");
    cargarTabla(colombia)//datosPaises.slice(0,50)
})
.catch((err)=>{
    console.log("Error al cargar los datos",err);
});

function cargarTabla(datos){
    datos.forEach(({Entity, Code, Year,'Solar (% equivalent primary energy)': Solar },index)=>{
        tablaPaises.innerHTML +=`<tr>
        <td>${Entity}</td>
        <td>${Code}</td>
        <td>${Year}</td>
        <td>${Solar ? Solar.toFixed(6) : 'N/A'}</td> <!-- Mostrar N/A si no hay valor -->
      </tr>`
    })
}
