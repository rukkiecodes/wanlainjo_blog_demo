const img = document.querySelector('.avatar img');
const  icon = document.querySelector('.avatar i');
const fullName = document.querySelector('.name');

let response
let userData = JSON.parse(localStorage.wanlaingoBlogData).user;

(async () => {
    let user = await fetch('https://wanlainjoblog-production.up.railway.app/auth/profile', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: userData.email
        })
    })

    response = await user.json()

    if (response.user.avatar != undefined && response.user.avatar != null) {
        img.src = response.user.avatar
        icon.style.display = 'none'
        img.style.display = 'initial'
    }

    fullName.innerText = response.user.name
})()

