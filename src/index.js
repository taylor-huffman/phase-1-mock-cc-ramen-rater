// write your code here
document.addEventListener('DOMContentLoaded', () => {
    const ramenUrl = 'http://localhost:3000/ramens'
    const ramenMenu = document.getElementById('ramen-menu')
    const ramenDetail = document.getElementById('ramen-detail')
    let ramenImg = document.querySelector('#ramen-detail img')
    let ramenName = document.querySelector('#ramen-detail h2')
    let ramenRestaurant = document.querySelector('#ramen-detail h3')
    let ramenRating = document.getElementById('rating-display')
    let ramenComment = document.getElementById('comment-display')
    let form = document.getElementById('new-ramen')

    fetch(ramenUrl)
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            console.log(item)
            createMenuItem(item)
        });
    })

    const createMenuItem = (item) => {
        let img = document.createElement('img')
        img.src = item.image
        img.addEventListener('click', (e) => showRamenDetails(e, item))
        ramenMenu.appendChild(img)
    }

    const showRamenDetails = (e, item) => {
        console.log(e)
        console.log(item)
        ramenImg.src = item.image
        ramenImg.alt = `${item.name} Image`
        ramenName.textContent = item.name
        ramenRestaurant.textContent = item.restaurant
        ramenRating.textContent = item.rating
        ramenComment.textContent = item.comment
    }

    const submitNewRamen = (e) => {
        e.preventDefault()
        let newRamenObj = {
            name: form.name.value,
            restaurant: form.restaurant.value,
            image: form.image.value,
            rating: form.rating.value,
            comment: form.new_comment.value
        }
        fetch(ramenUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newRamenObj)
        })
        .then(res => res.json())
        .then(() => createMenuItem(newRamenObj))
        form.reset()
    }

    form.addEventListener('submit', (e) => submitNewRamen(e))
})