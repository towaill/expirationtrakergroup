import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, deleteDoc, orderBy, query } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js';
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBG8_bICCsPD8RZCveG5uUxjDQW2LMu-rc",
    authDomain: "expirationtrackergroup.firebaseapp.com",
    projectId: "expirationtrackergroup",
    storageBucket: "expirationtrackergroup.appspot.com",
    messagingSenderId: "398051025602",
    appId: "1:398051025602:web:bb4a0ff98bf361a5a9115b",
    measurementId: "G-D7GZ2PEB4L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', async () => {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.replace('index.html');
        }
    });
    await loadInventoryItems();
});

async function loadInventoryItems() {
    const inventoryQuery = query(collection(db, 'master_inventory'), orderBy('Exp'));
    const querySnapshot = await getDocs(inventoryQuery);
    querySnapshot.forEach(doc => {
        addItemToTable(doc.id, doc.data());
    });
}

function addItemToTable(id, data) {
    const tbody = document.getElementById('item_list');
    const row = tbody.insertRow();
    const date = new Date(data.Exp).toLocaleDateString('en-US');
    const fields = [data.Product, date || 'No Expiration Date', data.Lot, data.Reference, data.Quantity];
    fields.forEach(text => {
        const cell = row.insertCell();
        cell.textContent = text;
    });
    const actionCell = row.insertCell();
    actionCell.innerHTML = `<button class="button" onclick="deleteItem('${id}')">Delete</button>`;
}

window.deleteItem = async function(id) {
    if (confirm("Are you sure you want to delete this item?")) {
        await deleteDoc(doc(db, 'master_inventory', id));
        location.reload();
    }
}
