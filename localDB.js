const localDB = {
    db: {},
    init: (stateSetter) => {
        let request = indexedDB.open("TrascriptDB", 1)

        request.onsuccess = function (event) {
            this.db = event.target.result;

            let tx = this.db.transaction(["transcript"], "readonly"),
                store = tx.objectStore('transcript'),
                req = store.openCursor(),
                transcript = [];

            req.onsuccess = function (event) {
                let cursor = event.target.result;
                if (cursor) {
                    transcript.push(cursor.value);
                    cursor.continue();
                }
                else {
                    stateSetter([...transcript])
                    return;
                }
            }
        }
        request.onerror = function (event) {
            console.error(event.target.error);
        }
        request.onupgradeneeded = function (event) {
            this.db = event.target.result;
            // keyPath needs be changed to whatever key will be used
            let transcript = this.db.createObjectStore("transcript", { keyPath: "id" });
        }
    },
    saveChat: (obj) => {
        let request = indexedDB.open("TrascriptDB", 1)

        request.onsuccess = function (event) {
            this.db = event.target.result;

            let transaction = this.db.transaction(["transcript"], "readwrite"),
                store = transaction.objectStore("transcript");

            store.add(obj)
            transaction.onerror = function (event) {
                console.error(event.target.error);
            }
        }

        request.onerror = function (event) {
            console.error(event.target.error);
        }
    }
}

export default localDB;
