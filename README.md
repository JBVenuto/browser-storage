# Local DB
Local storage using indexedDB for React apps

## Instructions
Create a copy of localDB.js and import it into the component you will use it in.
Make an empty array in your state for session storage of the data.
`const [arr, setArr] = useState([])`

### Reading data from indexedDB
Initialize the database and read its contents on load and pass it the function to
set the state with the stored data.
```
useEffect(() => {
        storedDB.init(setChatHist)
    }, [])
```

### Save data to indexedDB
Pass the object you would like saved into the save data function. This will likely
happen in a fetch request.
`storedDB.saveChat(obj)`
