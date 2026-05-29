import { initializeApp, } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    onValue,
    remove,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyDw6zIiKFGdgSCWBNQp_6THxxcv-t5781A",
    authDomain: "lldis-80e99.firebaseapp.com",
    databaseURL: "https://lldis-80e99-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lldis-80e99",
    storageBucket: "lldis-80e99.firebasestorage.app",
    messagingSenderId: "577409049794",
    appId: "1:577409049794:web:c73172a4736753c9a4075b",
    measurementId: "G-25V6RF8YFE"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


function addData() {

    const word =
        document.getElementById("inputWord").value;

    const vari =
        document.getElementById("inputvar").value;

    if (word == "" || vari == "") {

        return;

    }

    push(ref(db, "dis"), {

        word: word,
        var: vari

    });

    // ล้าง input
    document.getElementById("inputWord").value = "";

    document.getElementById("inputvar").value = "";

    // กลับไปช่องแรก
    document.getElementById("inputWord").focus();

}

document
    .getElementById("inputWord")
    .addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            document
                .getElementById("inputvar")
                .focus();

        }

    });

document
    .getElementById("inputvar")
    .addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            addData();

        }

    });

document
    .getElementById("inputing")
    .addEventListener("click", addData);
let showMean = true;
let showDelete = false;
let wordsData = {};
const disRef = ref(db, "dis");

onValue(disRef, (snapshot) => {

    const data = snapshot.val();

    wordsData = data;

    renderData(data);

});


function renderData(data) {

    if (!data) {

        document.getElementById("boxDis")
            .innerHTML = "ไม่มีข้อมูล";

        return;

    }

    const arr =
        Object.entries(data);

    let html = "";

    arr.forEach((item) => {

        const value = item[1];

        html += `

            <div class="card">
                
                <div class="word">
                <button onclick='speak(${JSON.stringify(value.word)})'>
                    🔊
                </button>
                    ${value.word}
                </div>

                <div class="rightsone">
                    <div class="mean"
                        style="display:${showMean ? "block" : "none"}">

                        ${value.var}

                    </div>

                    <button
                        class="deleteBtn"
                        style="display:${showDelete ? "block" : "none"}"
                        onclick="deleteData('${item[0]}','${value.word}','${value.var}')">

                        ลบ

                    </button>
                </div>

            </div>

        `;

    });

    document.getElementById("boxDis")
        .innerHTML = html;

}

window.speak = function(text) {

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);

}


window.deleteData = function (id, word, va) {

    const check =
        confirm(`ต้องการลบ "${word}" : "${va}" หรือไม่?`);

    if (check) {

        remove(ref(db, "dis/" + id));

    }

}

document
    .getElementById("randomSort")
    .addEventListener("click", () => {

        const arr =
            Object.entries(wordsData);

        arr.sort(() => Math.random() - 0.5);

        const shuffled =
            Object.fromEntries(arr);

        renderData(shuffled);

    });


document
    .getElementById("toggleDelete")
    .addEventListener("click", () => {

        const means =
            document.querySelectorAll(".deleteBtn");

        showDelete = !showDelete;

        means.forEach((item) => {

            if (showDelete) {

                item.style.display = "block";

            }
            else {

                item.style.display = "none";

            }

        });

    });

document
    .getElementById("toggleMean")
    .addEventListener("click", () => {

        const means =
            document.querySelectorAll(".mean");

        showMean = !showMean;

        means.forEach((item) => {

            if (showMean) {

                item.style.display = "block";

            }
            else {

                item.style.display = "none";

            }

        });

    });
