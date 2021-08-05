let db;
let request = indexedDB.open("TrascriptDB", 1)

request.onsuccess = function (event) {
    db = event.target.result;
    // saveChat({ message: "hello", index: 1 })
    // saveChat({ message: "hola", index: 2 })
}
request.onerror = function (event) {
    console.error(event.target.error);
}
request.onupgradeneeded = function (event) {
    db = event.target.result;
    // keyPath needs be changed to whatever key will be used
    let transcript = db.createObjectStore("transcript", { keyPath: "index" });
}

function saveChat(obj) {
    // console.log(db)
    let transaction = db.transaction(["transcript"], "readwrite"),
        store = transaction.objectStore("transcript");

    store.add(obj)
    transaction.onerror = function (event) {
        console.error(event.target.error);
    }
}

function readHistory() {
    let tx = db.transaction(["transcript"], "readonly"),
        store = tx.objectStore('transcript'),
        req = store.openCursor(),
        transcript = [];

    req.onsuccess = function (event) {
        let cursor = event.target.result;
        if (cursor) {
            console.log(cursor.value)
            transcript.push(cursor.value);
            cursor.continue();
        }
        else {
            return transcript;
        }
    }
}

// document.getElementById('click').addEventListener('click', event => {
//     console.log(readHistory())
//     readHistory()
//     .then(res => console.log(res))
// })
document.getElementById('click').addEventListener('click', foo);

async function foo() {
    let hist = await readHistory()
    console.log(hist)
}

// ************ Possible alternatives ************
// https://www.npmjs.com/package/localforage
// https://www.npmjs.com/package/idb

