let datosPaises = [];
const tablaPaises = document.getElementById('datosPaises');
const dataBtn = document.getElementById('dataBtn');

dataBtn.addEventListener('click', cargarData);

function cargarData(){
    fetch("./data/datos.json")
.then((res)=> res.json())
.then((data)=>{
    datosPaises = data;
    //let colombia = datosPaises.filter((pais) => pais.Entity === "Colombia");
    cargarTabla(datosPaises)//datosPaises.slice(0,50)
    new DataTable('#tablaPaises');
})
.catch((err)=>{
    console.log("Error al cargar los datos",err);
});
}


function cargarTabla(datos) {
    let filasTabla = '';
    datos.forEach(({ Entity, Code, Year, 'Electricity from solar (TWh)': Solar }) => {
        filasTabla += `
            <tr>
                <td>${Entity}</td>
                <td>${Code}</td>
                <td>${Year}</td>
                <td>${Solar ? Solar.toFixed(6) : 'N/A'}</td>
            </tr>
        `;
    });
    tablaPaises.innerHTML = filasTabla;
}
