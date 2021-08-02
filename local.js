function saveChatLocalStorage(obj) {
    const history = localStorage.getItem('chat-history') ? JSON.parse(localStorage.getItem('chat-history')) : [];
    history.push(obj)
    // Would we want to clear older messages? (Either store x amount or clear after so many days)
    localStorage.setItem('chat-history', JSON.stringify(history))
}


saveChatLocalStorage({message:"hello", index:1})
saveChatLocalStorage({message:"hola", index:2})