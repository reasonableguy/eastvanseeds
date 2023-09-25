// Load the Google Sheets API
gapi.load('client', start);
// Load the Google Sheets API
gapi.load('client', start);

function start() {
    // Initialize the Google API client with your OAuth Client ID
    gapi.client.init({
        clientId: '735911302077-bkrnoqnkgjt6fdgitde2afh33hacurqo.apps.googleusercontent.com',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        scope: 'https://www.googleapis.com/auth/spreadsheets.readonly', // Adjust scope as needed
    }).then(function () {
        // You should handle OAuth authorization here
        // See the note below for details
    });
}


            // Get references to DOM elements
            const tableBody = document.getElementById('tableBody');
            const filterCheckbox = document.getElementById('filterCheckbox');

            // Initialize the table with all items
            updateTable(data);

            // Add event listener to the checkbox
            filterCheckbox.addEventListener('change', function () {
                if (filterCheckbox.checked) {
                    // Filter and display items based on the checkbox state
                    const filteredData = data.filter(item => item[2] === 'Yes'); // Assuming 'Yes' in column C
                    updateTable(filteredData);
                } else {
                    // Show all items
                    updateTable(data);
                }
            });
        });
    });
}

function updateTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const descriptionCell = document.createElement('td');

        nameCell.textContent = item[0]; // Assuming name is in column A
        descriptionCell.textContent = item[1]; // Assuming description is in column B

        row.appendChild(nameCell);
        row.appendChild(descriptionCell);

        tableBody.appendChild(row);
    });
}
