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
    let newRamenForm = document.getElementById('new-ramen')
    let editRamenForm = document.getElementById('edit-ramen')

    const fetchMenuItems = () => {fetch(ramenUrl)
    .then(res => res.json())
    .then(data => {
        showInitialDetails(data[0])
        data.forEach(item => {
            createMenuItem(item)
        });
    })}
    fetchMenuItems()

    const createMenuItem = (item) => {
        let img = document.createElement('img')
        let deleteButton = document.createElement('button')
        let menuItemContainer = document.createElement('div')
        deleteButton.textContent = 'X'
        deleteButton.addEventListener('click', (e) => removeMenuItem(e, item))
        deleteButton.classList.add('delete-btn')
        img.src = item.image
        menuItemContainer.dataset.ramenId = item.id
        menuItemContainer.classList.add('menu-item-container')
        img.addEventListener('click', (e) => showRamenDetails(e, item))
        menuItemContainer.append(img, deleteButton)
        ramenMenu.appendChild(menuItemContainer)
    }

    const showRamenDetails = (e, item) => {
        console.log(e)
        ramenImg.src = item.image
        ramenImg.alt = `${item.name} Image`
        ramenName.textContent = item.name
        ramenRestaurant.textContent = item.restaurant
        ramenRating.textContent = item.rating
        ramenComment.textContent = item.comment
        editRamenForm.rating.value = item.rating
        editRamenForm.edit_comment.value = item.comment
        editRamenForm.dataset.currentId = item.id
    }

    const showInitialDetails = (item) => {
        ramenImg.src = item.image
        ramenImg.alt = `${item.name} Image`
        ramenName.textContent = item.name
        ramenRestaurant.textContent = item.restaurant
        ramenRating.textContent = item.rating
        ramenComment.textContent = item.comment
        editRamenForm.rating.value = item.rating
        editRamenForm.edit_comment.value = item.comment
        editRamenForm.dataset.currentId = item.id
    }

    const submitNewRamen = (e) => {
        e.preventDefault()
        let newRamenObj = {
            name: newRamenForm.name.value,
            restaurant: newRamenForm.restaurant.value,
            image: newRamenForm.image.value,
            rating: parseInt(newRamenForm.rating.value),
            comment: newRamenForm.new_comment.value
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
        newRamenForm.reset()
    }

    const editRamen = (e) => {
        e.preventDefault()
        let currentId = editRamenForm.dataset.currentId
        fetch(`${ramenUrl}/${currentId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                rating: parseInt(editRamenForm.rating.value),
                comment: editRamenForm.edit_comment.value
            })
        })
        .then(res => res.json())
        .then(() => updateFrontEnd())
    }

    const updateFrontEnd = () => {
        ramenRating.textContent = editRamenForm.rating.value
        ramenComment.textContent = editRamenForm.edit_comment.value
    }

    const removeMenuItem = (e, item) => {
        console.log(e)
        console.log(item)
        if (confirm('Are you sure you want to delete this item?')) {
        fetch(`${ramenUrl}/${item.id}`, {
            method: 'DELETE',
            headers: {
                'Conent-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(() => {
            e.target.parentNode.remove()
        })
    } 
}

    editRamenForm.addEventListener('submit', (e) => editRamen(e))
    newRamenForm.addEventListener('submit', (e) => submitNewRamen(e))
})