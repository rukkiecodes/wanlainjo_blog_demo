const postList = document.querySelector('.post-list');
const right = document.querySelector('.right');
const left = document.querySelector('.left');

(async () => {
    let posts = await fetch('https://wanlainjoblog-production.up.railway.app/post/getAllPosts', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
    })

    response = await posts.json()

    response.posts.forEach(post => {
        postList.innerHTML += `<div class="post">
                                    <div class="head">
                                        <div class="chip">
                                            <div class="avatar">
                                                <img src="${JSON.parse(post.currentUser).avatar}" alt="">
                                            </div>

                                            <span>${JSON.parse(post.currentUser).name}</span>
                                        </div>
                                    </div>

                                    <p class="postTite">${post.title}</p>

                                    <span class="postText">
                                        ${post.text.slice(0, 200)}...
                                    </span>
                                    <span class="postText2">
                                        ${post.text}
                                    </span>
                                    <div class="readMoreControles">
                                        <button class="readMore">Read more</button>
                                    </div>

                                    <button class="closeButton">Close</button>
                                </div>`
    });

    const allPosts = document.querySelectorAll('.readMore');

    allPosts.forEach(post => {
        let postElement = post.parentElement.parentElement.outerHTML

        post.addEventListener('click', () => {
            right.innerHTML = postElement

            const closeButton = document.querySelectorAll('.closeButton');
            closeButton.forEach(close => {
                close.addEventListener('click', () => {
                    right.innerHTML = ''
                    // left.style.display = 'block'
                    // right.style.display = 'none'
                })
            })
        })

        if (window.innerWidth <= 768) {
            console.log(1)
            post.addEventListener('click', () => {
                right.innerHTML = postElement

                left.style.display = 'none'
                right.style.display = 'block'
                console.log(1)

                const closeButton = document.querySelectorAll('.closeButton');

                closeButton.forEach(close => {
                    close.addEventListener('click', () => {
                        right.innerHTML = ''
                        left.style.display = 'block'
                        right.style.display = 'none'
                    })
                })
            })
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                if (right.childElementCount == 0) {
                    console.log(right.childElementCount)
                    left.style.display = 'none'
                    right.style.display = 'block'
                } else {
                    console.log(right.childElementCount)
                    left.style.display = 'block'
                    right.style.display = 'none'
                }
                console.log(2)

                post.addEventListener('click', () => {
                    right.innerHTML = postElement

                    left.style.display = 'none'
                    right.style.display = 'block'
                    console.log(3)

                    const closeButton = document.querySelectorAll('.closeButton');

                    closeButton.forEach(close => {
                        close.addEventListener('click', () => {
                            right.innerHTML = ''
                            left.style.display = 'block'
                            right.style.display = 'none'
                        })
                    })
                })
            } else {
                left.style.display = 'block'
                right.style.display = 'block'
                console.log(4)

                post.addEventListener('click', () => {
                    right.innerHTML = postElement

                    left.style.display = 'block'
                    right.style.display = 'block'
                    console.log(5)

                    const closeButton = document.querySelectorAll('.closeButton');

                    closeButton.forEach(close => {
                        close.addEventListener('click', () => {
                            right.innerHTML = ''
                        })
                    })
                })
            }
        })
    })
})();