document.addEventListener('DOMContentLoaded', function() {
    // Cargar equipos desde LocalStorage al cargar la página de equipos
    const equipos = JSON.parse(localStorage.getItem('equipos')) || [];

    // Mostrar los equipos en la página de lista
    const listaEquipos = document.getElementById('equipos-lista');
    equipos.forEach(equipo => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${equipo.nombre}</td>
            <td>${equipo.jugadores.join(', ')}</td>
        `;
        listaEquipos.appendChild(fila);
    });

    // Registrar equipo desde el formulario de registro
    const formEquipo = document.getElementById('form-equipo');
    if (formEquipo) {
        formEquipo.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar el comportamiento por defecto del formulario

            const nombreEquipo = document.getElementById('nombre-equipo').value;
            const jugadoresInput = document.getElementById('jugadores').value;
            const jugadores = jugadoresInput.split(',').map(jugador => jugador.trim());

            // Crear un nuevo objeto de equipo
            const nuevoEquipo = { nombre: nombreEquipo, jugadores: jugadores };

            // Cargar equipos previos de LocalStorage
            const equiposGuardados = JSON.parse(localStorage.getItem('equipos')) || [];

            // Agregar el nuevo equipo a la lista de equipos
            equiposGuardados.push(nuevoEquipo);

            // Guardar la lista actualizada de equipos en LocalStorage
            localStorage.setItem('equipos', JSON.stringify(equiposGuardados));

            // Redirigir a la página de lista de equipos después de registrar
            window.location.href = 'lista_equipos.html';
        });
    }
});
