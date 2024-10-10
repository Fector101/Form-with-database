async function getData(){
    let res = await fetch('/get-users')
    let data = await res.json()
    console.log(data)
}
getData()