async function getData(){
    let res = await fetch('/get-users')
    let data = res.json()
    console.log(data)
}
getData()