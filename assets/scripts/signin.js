let _email = document.querySelector('.email')
let _password = document.querySelector('.password')
let _button = document.querySelector('button')

_button.addEventListener('click', async () => {
    if (_email.value == '' && _password.value == '') return

    _button.innerText = 'Loading'

    fetch('https://wanlainjoblog-production.up.railway.app/auth/signin', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: _email.value,
            password: _password.value
        })
    }).then(res => res.json())
        .then(data => {
            _button.innerText = 'Sign In'
            if (data.message == 'Auth successful') {
                localStorage.wanlaingoBlogData = JSON.stringify(data)
                location.replace('/profile.html')
            }
        })
        .catch(error => {
            console.log('Error: ', error)
        })

})