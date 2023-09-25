// Client ID from your OAuth 2.0 credentials
const CLIENT_ID = '735911302077-bkrnoqnkgjt6fdgitde2afh33hacurqo.apps.googleusercontent.com';

// Google Sheets API configuration
const API_KEY = 'YOUR_API_KEY'; // Optional if you're using OAuth
const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

// Google Sheets Spreadsheet ID and Range
const SPREADSHEET_ID = 'https://docs.google.com/spreadsheets/d/1jfkCW1i1mx5MZEWEUrGicu0NiiIMwd013gZiPQ5WRHs/edit#gid=0&fvid=2058575219';
const RANGE = 'Sheet1';

// Initialize the Google API client
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
    }).then(function () {
        // Listen for sign-in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);

        // Handle the initial sign-in state
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

// Update UI elements based on the user's sign-in status
function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        // User is signed in, fetch Google Sheets data
        fetchSheetData();
    } else {
        // User is not signed in, show login button
        document.getElementById('loginButton').style.display = 'block';
    }
}

// Fetch Google Sheets data
function fetchSheetData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE,
    }).then(function (response) {
        const values = response.result.values;
        if (values && values.length > 0) {
            // Extract data and create checkboxes
            const checkboxesDiv = document.getElementById('checkboxes');
            values.forEach(function (row, index) {
                if (index === 0) return; // Skip header row
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `checkbox-${index}`;
                checkbox.value = row[0]; // Assuming the checkbox value is in the first column
                checkbox.addEventListener('change', function () {
                    // Show/hide corresponding div based on checkbox state
                    const div = document.getElementById(`div-${index}`);
                    if (this.checked) {
                        div.style.display = 'block';
                    } else {
                        div.style.display = 'none';
                    }
                });

                const label = document.createElement('label');
                label.htmlFor = `checkbox-${index}`;
                label.appendChild(document.createTextNode(row[0])); // Assuming the checkbox label is in the first column

                checkboxesDiv.appendChild(checkbox);
                checkboxesDiv.appendChild(label);
            });
        }
    });
}

// Attach click event to the login button
document.getElementById('loginButton').addEventListener('click', function () {
    gapi.auth2.getAuthInstance().signIn();
});

// Initialize the Google API client on page load
gapi.load('client:auth2', initClient);
