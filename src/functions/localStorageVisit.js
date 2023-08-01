const localStorageVisit = (name) => {

    const data = localStorage.getItem(name)
    if (data == null){
        localStorage.setItem(name, true)
    }
    return data
}

export default localStorageVisit