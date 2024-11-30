// Updated friends data with default groups
const friendsData = [
    // In Game
    { name: 'ShadowSlayer', status: 'In Game', currentGame: 'Elden Ring', timeInGame: '3 minutes', group: 'In Game' },

    // Online Friends
    { name: 'Gr4veDigger', status: 'Online', group: 'Online Friends' },
    { name: 'SilentK1ller', status: 'Online', group: 'Online Friends' },

    // Offline Friends
    { name: 'Dave', status: 'Offline', lastOnline: 'Last online 10 minutes ago', group: 'Offline Friends' },
    { name: 'Jack', status: 'Offline', lastOnline: 'Last online 1 hour ago', group: 'Offline Friends' },
    { name: 'GhostRyder', status: 'Offline', lastOnline: 'Last online 2 days ago', group: 'Offline Friends' },
    { name: 'DarkPhoenix', status: 'Offline', lastOnline: 'Last online 5 days ago', group: 'Offline Friends' },
    { name: 'LoneWolf', status: 'Offline', lastOnline: 'Last online 1 week ago', group: 'Offline Friends' },
    { name: 'IronFist', status: 'Offline', lastOnline: 'Last online 3 hours ago', group: 'Offline Friends' },
    { name: 'SilverHawk', status: 'Offline', lastOnline: 'Last online 2 weeks ago', group: 'Offline Friends' },
    { name: 'BlazeRunner', status: 'Offline', lastOnline: 'Last online 4 hours ago', group: 'Offline Friends' },

    // Casual Gamers
    { name: 'PixelDiva', status: 'Away', group: 'Casual Gamers' },
    { name: 'FarmLord', status: 'Offline', lastOnline: 'Last online 3 days ago', group: 'Casual Gamers' },
    { name: 'GameWarrior', status: 'In Game', currentGame: 'Overcooked 2', timeInGame: '25 minutes', group: 'Casual Gamers' },

    // Raid Team
    { name: 'Charlie', status: 'Away', raidProgress: 'Completed 3 Raids', group: 'Casual Gamers' },
    { name: 'RogueHealer', status: 'In Game', currentGame: 'Resident Evil 4', timeInGame: '2 hours', group: 'Raid Team' },
    { name: 'Titan', status: 'Away', raidProgress: 'Completed 5 Raids', group: 'Raid Team' },
    { name: 'BattleMage', status: 'Offline', lastOnline: 'Last online 4 hours ago', group: 'Raid Team' },

    // Co-Op Squad
    { name: 'TeamLeader', status: 'Online', group: 'Co-Op Squad' },
    { name: 'MedicMike', status: 'Away', group: 'Co-Op Squad' },
    { name: 'TankTony', status: 'Offline', lastOnline: 'Last online 1 day ago', group: 'Co-Op Squad' },
];

// References to DOM elements
const groupsContainer = document.querySelector('.groups');
const statusSelect = document.getElementById('status-select');
const customStatusInput = document.getElementById('custom-status');
const addGroupBtn = document.getElementById('add-group-btn');
const groupFilterSelect = document.getElementById('group-filter');
const exitSearchBtn = document.createElement('button');
const modal = document.getElementById('add-group-modal');
const createGroupBtn = document.getElementById('create-group-btn');
const cancelGroupBtn = document.getElementById('cancel-group-btn');
const addFriendModal = document.getElementById('add-friend-modal');
const friendNameInput = document.getElementById('friend-name-input');
const openAddFriendModalBtn = document.getElementById('open-add-friend-modal-btn');
const addFriendBtn = document.getElementById('add-friend-btn');
const cancelFriendBtn = document.getElementById('cancel-friend-btn');
const addToGroupModal = document.getElementById('add-to-group-modal');
const selectGroupDropdown = document.getElementById('select-group');
const friendNameDisplay = document.getElementById('friend-name-display');
const addToGroupBtn = document.getElementById('add-to-group-btn');
const cancelAddToGroupBtn = document.getElementById('cancel-add-to-group-btn');

let currentFriendName = ''; // Track the friend being added to a group

// Initialize Exit Search Button
exitSearchBtn.id = 'exit-search-btn';
exitSearchBtn.classList.add('hidden');
exitSearchBtn.textContent = 'Exit Search';
document.querySelector('.filter-section').appendChild(exitSearchBtn);

// Show the modal when "Add Group" button is clicked
addGroupBtn.addEventListener('click', () => modal.classList.remove('hidden'));

// Hide the modal when "Cancel" button is clicked
cancelGroupBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    clearModalFields();
});

// Clear modal input fields
function clearModalFields() {
    const groupNameInput = document.getElementById('group-name');
    if (groupNameInput) groupNameInput.value = ''; 
}

// Add a friend to a custom group
createGroupBtn.addEventListener('click', () => {
    const groupName = document.getElementById('group-name').value.trim();

    if (!groupName) {
        alert('Please enter a group name!');
        return;
    }

    if ([...getAllGroups(), ...customGroups].includes(groupName)) {
        alert('This group already exists!');
        return;
    }

    customGroups.push(groupName);

    populateGroupFilter([...getAllGroups(), ...customGroups]);
    renderGroups();

    modal.classList.add('hidden');
    clearModalFields();
});

// Show Add Friend Modal
openAddFriendModalBtn.addEventListener('click', () => {
    addFriendModal.classList.remove('hidden');
    friendNameInput.value = ''; 
});

// Hide Add Friend Modal
cancelFriendBtn.addEventListener('click', () => {
    addFriendModal.classList.add('hidden');
});

// Show the "Add to Group" modal
function showAddToGroupModal(friendName) {
    currentFriendName = friendName;
    friendNameDisplay.textContent = `Add "${friendName}" to a group:`;
    populateSelectGroupDropdown();
    addToGroupModal.classList.remove('hidden');
}


let customGroups = ['Casual Gamers', 'Raid Team', 'Co-Op Squad'];

// Populate the group dropdown
function populateSelectGroupDropdown() {
    selectGroupDropdown.innerHTML = ''; 

    const uniqueGroups = Array.from(new Set(customGroups)); 

    if (uniqueGroups.length === 0) {
        const option = document.createElement('option');
        option.textContent = 'No groups available';
        option.disabled = true;
        selectGroupDropdown.appendChild(option);
        return;
    }

    uniqueGroups.forEach(group => {
        const option = document.createElement('option');
        option.value = group;
        option.textContent = group;
        selectGroupDropdown.appendChild(option);
    });
}

// Handle "Add to Group" button click in the modal
addToGroupBtn.addEventListener('click', () => {
    const selectedGroup = selectGroupDropdown.value;
    if (selectedGroup) {
        const friend = friendsData.find(f => f.name === currentFriendName);
        if (friend) {
            friend.group = selectedGroup;
        }
        addToGroupModal.classList.add('hidden');
        renderGroups();
    }
});

// Hide the "Add to Group" modal
cancelAddToGroupBtn.addEventListener('click', () => {
    addToGroupModal.classList.add('hidden');
});

// Function to generate random status and group for a new friend
function generateRandomFriendFields(name) {
    const statuses = ['Online', 'Away', 'Offline', 'In Game'];
    const groups = ['Online Friends', 'Offline Friends', 'Casual Gamers', 'Raid Team'];
    const games = ['Elden Ring', 'Tekken 8', 'Diablo IV', 'DOTA 2', 'Overcooked 2', 'Resident Evil 4'];

    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomGroup = groups[Math.floor(Math.random() * groups.length)];

    const newFriend = {
        name: name,
        status: randomStatus,
        group: randomGroup,
    };

    if (randomStatus === 'In Game') {
        newFriend.currentGame = games[Math.floor(Math.random() * games.length)];
        newFriend.timeInGame = `${Math.floor(Math.random() * 60) + 1} minutes`;
    } else if (randomStatus === 'Offline') {
        newFriend.lastOnline = `Last online ${Math.floor(Math.random() * 24) + 1} hours ago`;
    }

    return newFriend;
}

// Add a new friend
addFriendBtn.addEventListener('click', () => {
    const friendName = friendNameInput.value.trim();

    if (!friendName) {
        alert('Please enter a friend name!');
        return;
    }

    const newFriend = generateRandomFriendFields(friendName);
    newFriend.isNew = true; 
    friendsData.push(newFriend); 

    // Display shiny gold text for the new friend
    const shinyIndicator = document.createElement('span');
    shinyIndicator.className = 'new-friend-indicator';
    shinyIndicator.textContent = 'New Friend!';
    
    renderGroups(); 
    const friendElements = [...document.querySelectorAll('.friend')];
    const addedFriendEl = friendElements.find(el => 
        el.querySelector('.friend-info h3').textContent === friendName
    );

    if (addedFriendEl) {
        const nameElement = addedFriendEl.querySelector('.friend-info h3');
        nameElement.appendChild(shinyIndicator); 
    }

    groupFilterSelect.value = 'All';
    exitSearchBtn.classList.add('hidden');

    addFriendModal.classList.add('hidden'); 
});

// Updated custom status handling
statusSelect.addEventListener('change', function () {
    const selectedStatus = this.value;
    const statusName = document.getElementById('status-name');
    const customStatusInput = document.getElementById('custom-status');

    // Clear all previous status classes
    statusName.className = '';

    if (selectedStatus === 'Away') {
        statusName.innerHTML = 'Away <img class="zzz-icon" src="zzz_icon.png" alt="zzz icon">';
        statusName.classList.add('status-away');
        updateUserStatus('Away');
        customStatusInput.style.display = 'none'; 
    } else if (selectedStatus === 'Online') {
        statusName.textContent = 'Online';
        statusName.classList.add('status-online');
        updateUserStatus('Online');
        customStatusInput.style.display = 'none'; 
    } else if (selectedStatus === 'Invisible') {
        statusName.textContent = 'Invisible';
        statusName.classList.add('status-invisible');
        updateUserStatus('Invisible');
        customStatusInput.style.display = 'none'; 
    } else if (selectedStatus === 'Custom') {
        customStatusInput.style.display = 'block'; 
        customStatusInput.addEventListener('input', function () {
            const customStatus = customStatusInput.value.trim();
            if (customStatus) {
                statusName.textContent = customStatus;
                statusName.classList.add('status-custom');
                updateUserStatus(customStatus);
            }
        });
    } else {
        customStatusInput.style.display = 'none';
    }
});

// Update the user's status
function updateUserStatus(newStatus) {
    const user = friendsData.find(friend => friend.name === 'Gamer_123');
    if (user) {
        user.status = newStatus;
        renderGroups();
    }
}

// Dynamically populate the dropdown with groups
function populateGroupFilter(groups) {
    const uniqueGroups = Array.from(new Set(groups));
    groupFilterSelect.innerHTML = '<option value="All">Friend\'s List</option>';

    uniqueGroups.forEach(groupName => {
        const option = document.createElement('option');
        option.value = groupName;
        option.textContent = groupName;
        groupFilterSelect.appendChild(option);
    });
}

// Get all unique group names
function getAllGroups() {
    const groups = new Set(friendsData.map(friend => friend.group));
    return Array.from(groups);
}

// Filter and display only the selected group
groupFilterSelect.addEventListener('change', function () {
    const selectedGroup = this.value;

    if (selectedGroup !== 'All') {
        renderFilteredGroup(selectedGroup);
        exitSearchBtn.classList.remove('hidden');
    } else {
        renderGroups();
        exitSearchBtn.classList.add('hidden');
    }
});

// Exit Search Button click event
exitSearchBtn.addEventListener('click', () => {
    groupFilterSelect.value = 'All';
    renderGroups();
    exitSearchBtn.classList.add('hidden');
});

// Render all groups
function renderGroups() {
    groupsContainer.innerHTML = '';

    const defaultGroups = {
        'In Game': [],
        'Online Friends': [],
        'Offline Friends': [],
    };

    customGroups.forEach(groupName => {
        defaultGroups[groupName] = [];
    });

    friendsData.forEach(friend => {
        if (customGroups.includes(friend.group)) {
            defaultGroups[friend.group].push(friend);
        }

        if (friend.status === 'In Game') {
            defaultGroups['In Game'].push(friend);
        } else if (friend.status === 'Online' || friend.status === 'Away') {
            defaultGroups['Online Friends'].push(friend);
        } else if (friend.status === 'Offline') {
            defaultGroups['Offline Friends'].push(friend);
        }
    });

    defaultGroups['Offline Friends'].sort((a, b) => {
        const parseLastOnline = str => {
            const match = str.match(/(\d+)\s(\w+)/);
            if (!match) return Infinity;
            const [_, value, unit] = match;
            const multiplier = {
                minute: 1,
                minutes: 1,
                hour: 60,
                hours: 60,
                day: 1440,
                days: 1440,
                week: 10080,
                weeks: 10080,
            };
            return (multiplier[unit.toLowerCase()] || Infinity) * parseInt(value, 10);
        };
        return parseLastOnline(a.lastOnline) - parseLastOnline(b.lastOnline);
    });

    // Render all groups (default and custom)
    Object.entries(defaultGroups).forEach(([groupName, groupFriends]) => {
        const isExpanded = ['In Game', 'Online Friends', 'Offline Friends'].includes(groupName);
        const groupEl = createGroupElement(groupName, groupFriends, isExpanded, true);
        groupsContainer.appendChild(groupEl);
    });
}

// Render only the selected group
function renderFilteredGroup(groupName) {
    groupsContainer.innerHTML = '';

    const groupFriends = friendsData.filter(friend => friend.group === groupName || isInPredefinedGroup(friend, groupName));
    const groupEl = createGroupElement(groupName, groupFriends, true, true);
    groupsContainer.appendChild(groupEl);
}

// Check if a friend belongs to a predefined group by status
function isInPredefinedGroup(friend, groupName) {
    if (groupName === 'In Game') return friend.status === 'In Game';
    if (groupName === 'Online Friends') return friend.status === 'Online' || friend.status === 'Away';
    if (groupName === 'Offline Friends') return friend.status === 'Offline';
    return false;
}

// Create a group element
function createGroupElement(groupName, groupFriends, expanded = false, isPredefined = false) {
    const groupEl = document.createElement('div');
    groupEl.className = 'group';

    const groupHeader = document.createElement('div');
    groupHeader.className = 'group-header';
    groupHeader.innerHTML = `
        <div class="group-title">
            <h2>${groupName} <span class="friend-count">(${groupFriends.length})</span></h2>
        </div>
        <span class="toggle-symbol">${expanded ? '-' : '+'}</span>
    `;
    groupEl.appendChild(groupHeader);

    const groupContent = document.createElement('div');
    groupContent.className = 'group-content';
    groupContent.style.display = expanded ? 'block' : 'none';

    if (groupFriends.length === 0) {
        groupContent.innerHTML = `<p style="color: #a9a9a9; font-size: 0.9em;">No friends in this group.</p>`;
    } else {
        groupFriends.forEach(friend => {
            const friendEl = document.createElement('div');
            friendEl.className = `friend ${groupName.toLowerCase().replace(' ', '-')} ${friend.status.toLowerCase().replace(' ', '-')}`;
            friendEl.innerHTML = `
                <img src="avatar.png" alt="Avatar">
                <div class="friend-info">
                    <h3>${friend.name}</h3>
                    ${
                        friend.status === 'In Game' && friend.timeInGame
                            ? `<p style="color: #32cd32;">${friend.currentGame}: in game for ${friend.timeInGame}</p>`
                            : friend.status === 'Online'
                            ? `<p class="status-online">Online</p>`
                            : friend.status === 'Away'
                            ? `<p class="status-away">Away <img class="zzz-icon" src="zzz_icon.png" alt="zzz icon"></p>`
                            : friend.lastOnline
                            ? `<p style="color: #a9a9a9;">${friend.lastOnline}</p>`
                            : ''
                    }
                </div>
                <img class="add-to-group-icon" src="plus_icon.png" alt="Add to Group">
            `;

            // Add the shiny indicator for new friends
            if (friend.isNew) {
                const shinyIndicator = document.createElement('span');
                shinyIndicator.className = 'new-friend-indicator';
                shinyIndicator.textContent = 'New Friend!';
                friendEl.querySelector('.friend-info h3').appendChild(shinyIndicator);
            }

            const addToGroupIcon = friendEl.querySelector('.add-to-group-icon');
            addToGroupIcon.addEventListener('click', () => showAddToGroupModal(friend.name));

            groupContent.appendChild(friendEl);
        });
    }

    groupEl.appendChild(groupContent);

    groupHeader.addEventListener('click', () => {
        const isVisible = groupContent.style.display === 'block';
        groupContent.style.display = isVisible ? 'none' : 'block';
        groupHeader.querySelector('.toggle-symbol').textContent = isVisible ? '+' : '-';

        if (!isVisible) {
            const newFriendIndicators = groupContent.querySelectorAll('.new-friend-indicator');
            newFriendIndicators.forEach(indicator => indicator.remove());
            groupFriends.forEach(friend => {
                if (friend.isNew) friend.isNew = false;
            });
        }
    });

    return groupEl;
}


// Initialize the app
function initializeApp() {
    const allGroups = [...getAllGroups(), ...customGroups]; // Combine default and custom groups
    populateGroupFilter(allGroups); // Populate the filter dropdown
    renderGroups(); // Render all groups
}

// Run the app
initializeApp();
