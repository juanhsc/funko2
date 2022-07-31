const tabla=document.querySelector('#lista-usuarios tbody')


function cargarNombre(){
fetch('productos.json')
.then(respuesta => respuesta.json())//indicamos el formato en el que se desea obtener la informacion
.then(nombres => {
    nombres.forEach(nombre => {
        const row = document.createElement('tr');
        row.innerHTML += 
        `<td>${nombre.id}</td>
        <td>${nombre.nombre}</td>
        <td>$${nombre.precio}</td>`;
    tabla.appendChild(row);
    });
})//mostramos la informacion
.catch(error => console.log('Hubo un error : ' + error.message))
}
cargarNombre();