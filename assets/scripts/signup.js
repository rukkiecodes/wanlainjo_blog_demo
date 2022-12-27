let _full_name = document.querySelector('.full_name')
let _email = document.querySelector('.email')
let _password = document.querySelector('.password')
let _button = document.querySelector('button')

_button.addEventListener('click', async () => {
    if (_full_name.value == '' && _email.value == '' && _password.value == '') return

    _button.innerText = 'Loading...'

    fetch('https://wanlainjoblog-production.up.railway.app/auth/signup', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: _full_name.value,
            email: _email.value,
            password: _password.value
        })
    }).then(res => res.json())
        .then(data => {
            _button.innerText = 'Sign Up'
            localStorage.wanlaingoBlogData = JSON.stringify(data)
            location.replace('/signin.html')
        })
        .catch(error => {
            console.log('Error: ', error)
        })

})