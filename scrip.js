let allTeams = [];
let registeredTeams = [];
let editingTeamIndex = -1;
let adminPlayers = [];
let upcomingGames = [];
let standingsData = [];

function loadFromStorage(key, defaultValue) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function initializeData() {
    allTeams = loadFromStorage('teams', [
        { name: 'Águilas', logo: '🦅', coach: 'Juan Pérez', contact: '+527711234567' },
        { name: 'Leones', logo: '🦁', coach: 'María López', contact: '+920722345678' }
    ]);
    registeredTeams = loadFromStorage('registeredTeams', []);
    adminPlayers = loadFromStorage('players', [
        { name: 'Carlos Gómez', team: 'Águilas', points: 15.5, rebounds: 7.2, assists: 4.1, avatar: '💪' },
        { name: 'Ana Martínez', team: 'Leones', points: 12.8, rebounds: 5.6, assists: 3.9, avatar: '⭐' }
    ]);
    upcomingGames = loadFromStorage('games', [
        { team1: 'Águilas', team2: 'Leones', date: '2025-06-01', time: '14:00', venue: 'Gimnasio Municipal' }
    ]);
    standingsData = loadFromStorage('standings', allTeams.map(team => ({
        team: team.name,
        pj: 0,
        pg: 0,
        pp: 0,
        pf: 0,
        pc: 0
    })));
}

function saveAllData() {
    saveToStorage('teams', allTeams);
    saveToStorage('registeredTeams', registeredTeams);
    saveToStorage('players', adminPlayers);
    saveToStorage('games', upcomingGames);
    saveToStorage('standings', standingsData);
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    document.querySelectorAll('.nav button').forEach(button => button.classList.remove('active'));
    document.querySelector(`button[onclick="showSection('${sectionId}')"]`).classList.add('active');

    switch (sectionId) {
        case 'posiciones':
            updateMainStandings();
            break;
        case 'equipos':
            loadTeams();
            break;
        case 'jugadores':
            loadPlayers();
            break;
        case 'calendario':
            loadCalendario();
            break;
        case 'registro':
            loadRegisteredTeams();
            break;
        case 'admin':
            showAdminSection('teams');
            break;
    }
}

function showAdminSection(section) {
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.getElementById(`admin-${section}`).classList.add('active');
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`button[onclick="showAdminSection('${section}')"]`).classList.add('active');

    switch (section) {
        case 'teams':
            loadAdminTeams();
            break;
        case 'standings':
            loadAdminStandings();
            break;
        case 'players':
            loadAdminPlayers();
            break;
        case 'games':
            loadUpcomingGames();
            break;
    }
}

function loadTeams() {
    const teamsGrid = document.getElementById('teamsGrid');
    teamsGrid.innerHTML = '';

    if (allTeams.length === 0) {
        teamsGrid.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1;">No hay equipos registrados.</p>';
        return;
    }

    allTeams.forEach(team => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        teamCard.innerHTML = `
            <div class="team-logo">${team.logo}</div>
            <div class="team-name">${team.name}</div>
            <div class="team-contact">📞 ${team.contact}</div>
            <div class="team-contact">👨‍🏫 DT: ${team.coach}</div>
        `;
        teamsGrid.appendChild(teamCard);
    });
}

function loadPlayers() {
    const playersGrid = document.getElementById('playersGrid');
    playersGrid.innerHTML = '';

    if (adminPlayers.length === 0) {
        playersGrid.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1;">No hay jugadores registrados.</p>';
        return;
    }

    adminPlayers.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.innerHTML = `
            <div class="player-avatar">${player.avatar}</div>
            <div class="player-name">${player.name}</div>
            <div style="opacity: 0.8; margin-bottom: 10px;">${player.team}</div>
            <div class="player-stats">
                <div class="stat-item">
                    <strong>${player.points}</strong><br>
                    <small>PTS/Juego</small>
                </div>
                <div class="stat-item">
                    <strong>${player.rebounds}</strong><br>
                    <small>REB/Juego</small>
                </div>
                <div class="stat-item">
                    <strong>${player.assists}</strong><br>
                    <small>AST/Juego</small>
                </div>
                <div class="stat-item">
                    <strong>✅</strong><br>
                    <small>MVP</small>
                </div>
            </div>
        `;
        playersGrid.appendChild(playerCard);
    });
}

function loadCalendario() {
    const gamesContainer = document.getElementById('upcomingGames');
    gamesContainer.innerHTML = '';

    if (upcomingGames.length === 0) {
        gamesContainer.innerHTML = '<p style="text-align: center; color: #666;">No hay partidos programados.</p>';
        return;
    }

    upcomingGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <div class="game-logo">🏀</div>
            <h4>${game.team1} vs ${game.team2}</h4>
            <p>📅 ${game.date}</p>
            <p>⏰ ${game.time}</p>
            <p>📍 ${game.venue}</p>
        `;
        gamesContainer.appendChild(gameCard);
    });
}

function loadAdminTeams() {
    const grid = document.getElementById('adminTeamsGrid');
    grid.innerHTML = '';

    allTeams.forEach((team, index) => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        teamCard.innerHTML = `
            <div class="team-logo">${team.logo}</div>
            <div class="team-name">${team.name}</div>
            <div class="team-contact">📞 ${team.contact}</div>
            <div class="team-contact">👨‍🏫 DT: ${team.coach}</div>
            <div class="team-actions">
                <button class="btn btn-small btn-edit" onclick="editAdminTeam(${index})">✏️ Editar</button>
                <button class="btn btn-small btn-delete" onclick="deleteAdminTeam(${index})">🗑️ Eliminar</button>
            </div>
        `;
        grid.appendChild(teamCard);
    });
    updateStats();
}

function generatePDF() {
    const { jsPDF } = window.jspdf; 
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
    });

    // Select the card containing the table and legend
    const element = document.querySelector('#posiciones .card');

    html2canvas(element, {
        scale: 2, 
        useCORS: true 
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        doc.save('Tabla_Posiciones_Tizayuca_2025.pdf');
    }).catch(error => {
        console.error('Error generating PDF:', error);
        alert('Ocurrió un error al generar el PDF. Por favor, intenta de nuevo.');
    });
}

function loadAdminStandings() {
    const tbody = document.getElementById('adminStandingsBody');
    tbody.innerHTML = '';

    standingsData.forEach((team, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${team.team}</strong></td>
            <td><input type="number" value="${team.pj}" min="0" onchange="updateStanding(${index}, 'pj', this.value)"></td>
            <td><input type="number" value="${team.pg}" min="0" onchange="updateStanding(${index}, 'pg', this.value)"></td>
            <td><input type="number" value="${team.pp}" min="0" onchange="updateStanding(${index}, 'pp', this.value)"></td>
            <td><input type="number" value="${team.pf}" min="0" onchange="updateStanding(${index}, 'pf', this.value)"></td>
            <td><input type="number" value="${team.pc}" min="0" onchange="updateStanding(${index}, 'pc', this.value)"></td>
            <td class="action-buttons">
                <button class="btn-icon btn-delete" onclick="removeTeamFromStandings(${index})" title="delete">🗑️</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadAdminPlayers() {
    const grid = document.getElementById('adminPlayersGrid');
    grid.innerHTML = '';

    adminPlayers.forEach((player, index) => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.innerHTML = `
            <div class="player-avatar">${player.avatar || '🏀'}</div>
            <div class="player-name">${player.name}</div>
            <div style="opacity: 0.8; margin-bottom: 10px;">${player.team}</div>
            <div class="player-stats">
                <div class="stat-item">
                    <strong>${player.points}</strong><br>
                    <small>PTS</small>
                </div>
                <div class="stat-item">
                    <strong>${player.rebounds}</strong><br>
                    <small>REB</small>
                </div>
                <div class="stat-item">
                    <strong>${player.assists}</strong><br>
                    <small>AST</small>
                </div>
                <div class="stat-item">
                    <button class="btn btn-small btn-delete" onclick="deleteAdminPlayer(${index})">Delete</button>
                </div>
            </div>
        `;
        grid.appendChild(playerCard);
    });
    updateStats();
}

function loadUpcomingGames() {
    const gamesContainer = document.getElementById('upcomingGames');
    gamesContainer.innerHTML = '';

    if (upcomingGames.length === 0) {
        gamesContainer.innerHTML = '<p style="text-align: center; color: #666;">No hay partidos programados.</p>';
        return;
    }

    upcomingGames.forEach((game, index) => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <h4>${game.team1} vs ${game.team2}</h4>
            <p>📅 ${game.date} - ${game.time}</p>
            <p>📍 ${game.venue}</p>
            <div class="team-actions">
                <button class="btn btn-small btn-delete" onclick="deleteGame(${index})">🗑️ Cancelar</button>
            </div>
        `;
        gamesContainer.appendChild(gameCard);
    });
    updateStats();
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
    if (modalId === 'addPlayerModal' || modalId === 'addGameModal') {
        fillTeamSelects();
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.querySelector(`#${modalId} form`).reset();
}

function fillTeamSelects() {
    const playerTeamSelect = document.getElementById('modalPlayerTeam');
    const team1Select = document.getElementById('modalTeam1');
    const team2Select = document.getElementById('modalTeam2');

    const teamOptions = allTeams.map(team => `<option value="${team.name}">${team.name}</option>`).join('');

    if (playerTeamSelect) {
        playerTeamSelect.innerHTML = '<option value="">Seleccionar equipo...</option>' + teamOptions;
    }
    if (team1Select) {
        team1Select.innerHTML = '<option value="">Seleccionar...</option>' + teamOptions;
    }
    if (team2Select) {
        team2Select.innerHTML = '<option value="">Seleccionar...</option>' + teamOptions;
    }
}

function editAdminTeam(index) {
    const team = allTeams[index];
    document.getElementById('modalTeamName').value = team.name;
    document.getElementById('modalTeamLogo').value = team.logo;
    document.getElementById('modalCoachName').value = team.coach;
    document.getElementById('modalTeamContact').value = team.contact;
    document.getElementById('addTeamForm').setAttribute('data-editing', index);
    openModal('addTeamModal');
}

function deleteAdminTeam(index) {
    if (confirm('¿Eliminar este equipo? Esto afectará todas las secciones.')) {
        const teamName = allTeams[index].name;
        allTeams.splice(index, 1);
        standingsData = standingsData.filter(s => s.team !== teamName);
        registeredTeams = registeredTeams.filter(t => t.name !== teamName);
        adminPlayers = adminPlayers.filter(p => p.team !== teamName);
        upcomingGames = upcomingGames.filter(g => g.team1 !== teamName && g.team2 !== teamName);
        saveAllData();
        loadAdminTeams();
        loadTeams();
        loadPlayers();
        loadCalendario();
        updateMainStandings();
        showAlert('Equipo eliminado correctamente', 'success');
    }
}

function updateStanding(index, field, value) {
    standingsData[index][field] = parseInt(value) || 0;
    saveToStorage('standings', standingsData);
    calculateStandingsStats();
    loadAdminStandings();
    updateMainStandings();
    showAlert('Estadísticas actualizadas', 'success');
}

function calculateStandingsStats() {
    standingsData.forEach(team => {
        team.diff = team.pf - team.pc;
        team.pts = (team.pg * 2) + team.pp;
    });
    standingsData.sort((a, b) => b.pts - a.pts || b.diff - a.diff);
    saveToStorage('standings', standingsData);
}

function saveStandings() {
    calculateStandingsStats();
    loadAdminStandings();
    updateMainStandings();
    showAlert('Tabla de posiciones guardada', 'success');
}

function resetStandings() {
    if (confirm('¿Restablecer la tabla de posiciones?')) {
        standingsData = allTeams.map(team => ({
            team: team.name,
            pj: 0,
            pg: 0,
            pp: 0,
            pf: 0,
            pc: 0
        }));
        saveToStorage('standings', standingsData);
        loadAdminStandings();
        updateMainStandings();
        showAlert('Tabla restablecida', 'success');
    }
}

function removeTeamFromStandings(index) {
    if (confirm('¿Eliminar este equipo de la tabla?')) {
        standingsData.splice(index, 1);
        saveToStorage('standings', standingsData);
        loadAdminStandings();
        updateMainStandings();
        showAlert('Equipo eliminado de la tabla', 'success');
    }
}

function deleteAdminPlayer(index) {
    if (confirm('¿Eliminar este jugador?')) {
        adminPlayers.splice(index, 1);
        saveToStorage('players', adminPlayers);
        loadAdminPlayers();
        loadPlayers();
        showAlert('Jugador eliminado', 'success');
        updateStats();
    }
}

function deleteGame(index) {
    if (confirm('¿Cancelar este partido?')) {
        upcomingGames.splice(index, 1);
        saveToStorage('games', upcomingGames);
        loadUpcomingGames();
        loadCalendario();
        showAlert('Partido cancelado', 'success');
        updateStats();
    }
}

function showAlert(message, type) {
    const alert = document.getElementById('adminAlert');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.display = 'block';
    setTimeout(() => alert.style.display = 'none', 3000);
}

function updateStats() {
    document.getElementById('totalTeams').textContent = allTeams.length;
    document.getElementById('totalPlayers').textContent = adminPlayers.length;
    document.getElementById('totalGames').textContent = upcomingGames.length;
}

function handleAddTeam(event) {
    event.preventDefault();
    const form = event.target;
    const index = form.getAttribute('data-editing');

    const teamData = {
        name: document.getElementById('modalTeamName').value,
        logo: document.getElementById('modalTeamLogo').value,
        coach: document.getElementById('modalCoachName').value,
        contact: document.getElementById('modalTeamContact').value
    };

    if (allTeams.some(t => t.name === teamData.name && index !== allTeams.indexOf(t).toString())) {
        showAlert('El equipo ya existe', 'error');
        return;
    }

    if (index !== null && index !== '') {
        allTeams[index] = teamData;
        standingsData = standingsData.map(s => s.team === allTeams[index].name ? {...s, team: teamData.name } : s);
        showAlert('Equipo actualizado', 'success');
    } else {
        allTeams.push(teamData);
        standingsData.push({
            team: teamData.name,
            pj: 0,
            pg: 0,
            pp: 0,
            pf: 0,
            pc: 0
        });
        showAlert('Equipo agregado', 'success');
    }

    saveAllData();
    closeModal('addTeamModal');
    loadAdminTeams();
    loadTeams();
    updateMainStandings();
}

function handleAddPlayer(event) {
    event.preventDefault();

    const playerData = {
        name: document.getElementById('modalPlayerName').value,
        team: document.getElementById('modalPlayerTeam').value,
        points: parseFloat(document.getElementById('modalPlayerPoints').value) || 0,
        rebounds: parseFloat(document.getElementById('modalPlayerRebounds').value) || 0,
        assists: parseFloat(document.getElementById('modalPlayerAssists').value) || 0,
        avatar: '🏀'
    };

    adminPlayers.push(playerData);
    saveToStorage('players', adminPlayers);
    closeModal('addPlayerModal');
    loadAdminPlayers();
    loadPlayers();
    showAlert('Jugador agregado', 'success');
    updateStats();
}

function handleAddGame(event) {
    event.preventDefault();

    const gameData = {
        team1: document.getElementById('modalTeam1').value,
        team2: document.getElementById('modalTeam2').value,
        date: document.getElementById('modalGameDate').value,
        time: document.getElementById('modalGameTime').value,
        venue: document.getElementById('modalGameVenue').value || 'Gimnasio Municipal'
    };

    if (gameData.team1 === gameData.team2) {
        showAlert('No se puede programar un partido contra el mismo equipo', 'error');
        return;
    }

    upcomingGames.push(gameData);
    saveToStorage('games', upcomingGames);
    closeModal('addGameModal');
    loadUpcomingGames();
    loadCalendario();
    showAlert('Partido programado', 'success');
    updateStats();
}

function updateMainStandings() {
    const tbody = document.querySelector('#posiciones .table tbody');
    tbody.innerHTML = '';

    calculateStandingsStats();

    standingsData.forEach((team, index) => {
        const diff = team.pf - team.pc;
        const points = (team.pg * 2) + team.pp;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${team.team}</td>
            <td>${team.pj}</td>
            <td>${team.pg}</td>
            <td>${team.pp}</td>
            <td>${team.pf}</td>
            <td>${team.pc}</td>
            <td>${diff > 0 ? '+' : ''}${diff}</td>
            <td>${points}</td>
        `;
        tbody.appendChild(row);
    });
}

function exportTeamsData() {
    const dataStr = JSON.stringify(allTeams, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = document.createElement('a');
    url.href = URL.createObjectURL(blob);
    url.download = 'teams_data.json';
    url.click();
    URL.revokeObjectURL(url.href);
    showAlert('Datos exportados correctamente', 'success');
}

function generatePlayerStats() {
    adminPlayers.forEach(player => {
        player.points = (Math.random() * 20 + 10).toFixed(1);
        player.rebounds = (Math.random() * 10 + 5).toFixed(1);
        player.assists = (Math.random() * 8 + 2).toFixed(1);
    });
    saveAllData();
    loadAdminPlayers();
    loadPlayers();
    showAlert('Estadísticas generadas', 'success');
}

function generateSchedule() {
    upcomingGames = [];
    const venues = ['Gimnasio Municipal', 'Cancha Central', 'Estadio Hidalgo'];
    const times = ['10:00', '12:00', '14:00', '16:00'];

    for (let i = 0; i < allTeams.length; i++) {
        for (let j = i + 1; j < allTeams.length; j++) {
            const date = new Date();
            date.setDate(date.getDate() + Math.floor(Math.random() * 30));

            upcomingGames.push({
                team1: allTeams[i].name,
                team2: allTeams[j].name,
                date: date.toISOString().split('T')[0],
                time: times[Math.floor(Math.random() * times.length)],
                venue: venues[Math.floor(Math.random() * venues.length)]
            });
        }
    }

    saveAllData();
    loadUpcomingGames();
    loadCalendario();
    showAlert('Calendario generado', 'success');
    updateStats();
}

function resetAllTeams() {
    if (confirm('¿Reiniciar toda la liga? Esto eliminará todos los datos.')) {
        allTeams = [
            { name: 'Águilas', logo: '🦅', coach: 'Juan Pérez', contact: '+527711234567' },
            { name: 'Leones', logo: '🦁', coach: 'María López', contact: '+52772345678' }
        ];
        registeredTeams = [];
        adminPlayers = [
            { name: 'Carlos Gómez', team: 'Águilas', points: 15.5, rebounds: 7.2, assists: 4.1, avatar: '💪' },
            { name: 'Ana Martínez', team: 'Leones', points: 12.8, rebounds: 5.6, assists: 3.9, avatar: '⭐' }
        ];
        upcomingGames = [
            { team1: 'Águilas', team2: 'Leones', date: '2025-06-01', time: '14:00', venue: 'Gimnasio Municipal' }
        ];
        standingsData = allTeams.map(team => ({
            team: team.name,
            pj: 0,
            pg: 0,
            pp: 0,
            pf: 0,
            pc: 0
        }));
        saveAllData();
        loadAdminTeams();
        loadAdminPlayers();
        loadUpcomingGames();
        loadTeams();
        loadPlayers();
        loadCalendario();
        updateMainStandings();
        loadRegisteredTeams();
        showAlert('Liga reiniciada', 'success');
        updateStats();
    }
}

function handleTeamRegistration(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const teamData = {
        name: formData.get('teamName'),
        logo: formData.get('teamLogo'),
        coach: formData.get('coachName'),
        contact: formData.get('teamContact'),
        email: formData.get('teamEmail') || 'No especificado',
        founded: formData.get('foundedYear') || 'No especificado',
        description: formData.get('teamDescription') || 'Sin descripción',
        colors: formData.get('teamColors') || 'No especificado',
        registrationDate: new Date().toLocaleDateString('es-MX')
    };

    if (registeredTeams.some(t => t.name === teamData.name && editingTeamIndex === -1)) {
        showAlert('El equipo ya existe', 'error');
        return;
    }

    if (editingTeamIndex !== -1) {
        registeredTeams[editingTeamIndex] = teamData;
        showAlert('Equipo actualizado', 'success');
    } else {
        registeredTeams.push(teamData);
        allTeams.push({
            name: teamData.name,
            logo: teamData.logo,
            coach: teamData.coach,
            contact: teamData.contact,
        });
        standingsData.push({
            team: teamData.name,
            pj: 0,
            pg: 0,
            pp: 0,
            pf: 0,
            pc: 0
        });
        showAlert('Equipo registrado', 'success');
    }

    saveAllData();
    loadRegisteredTeams();
    loadTeams();
    updateMainStandings();
    document.getElementById('successMessage').style.display = 'block';
    setTimeout(() => {
        document.getElementById('successMessage').style.display = 'none';
    }, 3000);
    clearForm();
}

function clearForm() {
    document.getElementById('teamRegistrationForm').reset();
    editingTeamIndex = -1;
    document.querySelector('.btn[type="submit"]').innerHTML = '🏀 Registrar Equipo';
}

function loadRegisteredTeams() {
    const grid = document.getElementById('registeredTeamsGrid');
    grid.innerHTML = '';

    if (registeredTeams.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1;">No hay equipos registrados. Registra el primero!</p>';
        return;
    }

    registeredTeams.forEach((team, index) => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        teamCard.innerHTML = `
            <div class="team-logo">${team.logo}</div>
            <div class="team-name">${team.name}</div>
            <div class="team-contact">📞 ${team.contact}</div>
            <div class="team-contact">👨‍⚕️ DT: ${team.coach}</div>
            <div class="team-contact">📧 ${team.email}</div>
            <div class="team-contact">🎨 ${team.colors}</div>
            <div class="team-contact">📅 Fundado: ${team.founded}</div>
            <div class="team-contact" style="margin-top: 10px; font-size: 0.85rem; opacity: 0.8;">
                Registrado: ${team.registrationDate}
            </div>
            <div class="team-actions">
                <button class="btn btn-small btn-edit" onclick="editTeam(${index})">✏️ Editar</button>
                <button class="btn btn-small btn-delete" onclick="deleteTeam(${index})">🗑️ Eliminar</button>
            </div>
        `;
        grid.appendChild(teamCard);
    });
}

function editTeam(index) {
    const team = registeredTeams[index];
    editingTeamIndex = index;
    document.getElementById('teamName').value = team.name;
    document.getElementById('teamLogo').value = team.logo;
    document.getElementById('coachName').value = team.coach;
    document.getElementById('teamContact').value = team.contact;
    document.getElementById('teamEmail').value = team.email === 'No especificado' ? '' : team.email;
    document.getElementById('foundedYear').value = team.founded === 'No especificado' ? '' : team.founded;
    document.getElementById('teamDescription').value = team.description === 'Sin descripción' ? '' : team.description;
    document.getElementById('teamColors').value = team.colors === 'No especificado' ? '' : team.colors;
    document.querySelector('.btn[type="submit"]').innerHTML = '✏️ Actualizar Equipo';
    document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
}

function deleteTeam(index) {
    if (confirm('¿Eliminar este equipo? Esto afectará todas las secciones.')) {
        const teamName = registeredTeams[index].name;
        registeredTeams.splice(index, 1);
        allTeams = allTeams.filter(t => t.name !== teamName);
        standingsData = standingsData.filter(s => s.team !== teamName);
        adminPlayers = adminPlayers.filter(p => p.team !== teamName);
        upcomingGames = upcomingGames.filter(g => g.team1 !== teamName && g.team2 !== teamName);
        saveAllData();
        loadRegisteredTeams();
        loadTeams();
        loadPlayers();
        loadCalendario();
        updateMainStandings();
        showAlert('Equipo eliminado', 'success');
    }
}

function addTableEffects() {
    const rows = document.querySelectorAll('.table tbody tr');
    rows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        });
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    document.getElementById('teamRegistrationForm').addEventListener('submit', handleTeamRegistration);
    document.getElementById('addTeamForm').addEventListener('submit', handleAddTeam);
    document.getElementById('addPlayerForm').addEventListener('submit', handleAddPlayer);
    document.getElementById('addGameForm').addEventListener('submit', handleAddGame);

    updateMainStandings();
    loadRegisteredTeams();
    loadTeams();
    loadPlayers();
    loadCalendario();
    addTableEffects();

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

document.addEventListener('click', function(e) {
    if (e.target.closest('.team-card, .game-card')) {
        const card = e.target.closest('.team-card, .game-card');
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'scale(1.05)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 100);
        }, 100);
    }
});

setInterval(() => {
    const rows = document.querySelectorAll('.table tbody tr');
    rows.forEach(row => {
        row.style.background = row.style.background === 'rgba(255, 235, 59, 0.1)' ? '' : 'rgba(255, 235, 59, 0.1)';
        setTimeout(() => {
            row.style.background = '';
        }, 1000);
    });
}, 30000);
