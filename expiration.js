import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import {
    getFirestore,
    collection,
    getDocs,
    where,
    query,
    orderBy
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyBG8_bICCsPD8RZCveG5uUxjDQW2LMu-rc",
    authDomain: "expirationtrackergroup.firebaseapp.com",
    projectId: "expirationtrackergroup",
    storageBucket: "expirationtrackergroup.appspot.com",
    messagingSenderId: "398051025602",
    appId: "1:398051025602:web:bb4a0ff98bf361a5a9115b",
    measurementId: "G-D7GZ2PEB4L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

window.addEventListener('load', (event) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            afterLoad().then(r => {});
        } else {
            window.open('index.html',"_self")
        }
    });
});

async function afterLoad() {
    const exp_lookup_button = document.getElementById("exp_lookup_button");
    exp_lookup_button.addEventListener("click", findExpItems);

    async function findExpItems() {

        let start_date = document.getElementById('start_date').value;
        start_date = new Date(start_date);
        let end_date = document.getElementById('end_date').value;
        end_date = new Date(end_date);
        start_date = Math.floor(start_date.getTime());
        end_date = Math.floor(end_date.getTime() + end_date.getTimezoneOffset()*60*1000);

        document.getElementById("to_be_replaced").innerHTML = '<br><br>' +
            '       <table>' +
            '       <thead>' +
            '       <th>Product</th>\n' +
            '       <th>Exp</th>\n' +
            '       <th>Lot</th>\n' +
            '       <th>REF</th>\n' +
            '       <th>Quantity</th>\n' +
            '       </thead>\n' +
            '       <tbody id="exp_tbody"></tbody></table>'

        if (start_date > end_date) {
            window.alert("please select an appropriate date range")
        } else {

            const master_inventory = await query(collection(db, `master_inventory`),
                where("Exp", ">=", start_date), where("Exp", "<=", end_date), orderBy("Exp"));

            getDocs(master_inventory).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    expItems(doc.data().Product, doc.data().Exp, doc.data().Lot, doc.data().Reference, doc.data().Quantity);
                });
            });

            let exp_tbody = document.getElementById('exp_tbody');

            function expItems(Product, Exp2, Lot, REF, Quantity) {
                Exp2 = new Date(Exp2)
                let exp_trow = document.createElement("tr");
                let exp_td1 = document.createElement("td");
                let exp_td2 = document.createElement("td");
                let exp_td3 = document.createElement("td");
                let exp_td4 = document.createElement("td");
                let exp_td5 = document.createElement("td");
                exp_td1.innerHTML = Product
                exp_td2.innerHTML = Exp2.toLocaleDateString('en-US');
                exp_td3.innerHTML = Lot
                exp_td4.innerHTML = REF
                exp_td5.innerHTML = Quantity
                exp_trow.appendChild(exp_td1)
                exp_trow.appendChild(exp_td2)
                exp_trow.appendChild(exp_td3)
                exp_trow.appendChild(exp_td4)
                exp_trow.appendChild(exp_td5)
                exp_tbody.appendChild(exp_trow)
            }
        }
    }
}

