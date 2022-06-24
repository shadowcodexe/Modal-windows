let videoCards = [
    {id: 1, title: 'Nvidia', price: 400, image: 'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/geforce-rtx-turing/store/geforce-rtx-20-series-graphics-cards-630-d@2x.jpg'},
    {id: 2, title: 'AMD', price: 370, image: 'https://www.overclockers.ua/video/amd-radeon-r9-290-asus-dc2oc/02-big-amd-radeon-r9-290-asus-dc2oc.jpg'},
    {id: 3, title: 'Intel', price: 300, image: 'https://itc.ua/wp-content/uploads/2020/06/intel-dg1-xe-graphics-sdv-8.jpg'}
]

function toHTML(item) {
    return `
        <div class="card" style="width: 18rem;">
        <img src="${item.image}" class="card-img-top" alt="${item.title}">
        <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${item.id}">View price</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${item.id}">Delete</a>
        </div>
        </div>
    `
}

function render() {
    const html = videoCards.map(el => toHTML(el)).join('')
    document.querySelector('.col').innerHTML = html
}

render()

document.addEventListener('click',(event) => {

    let btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const videoCard = videoCards.find(f => f.id === id)

    if (btnType === 'price') {
        priceModal.setContent(`
            <p> Price for ${videoCard.title}: <strong>${videoCard.price}$</strong>
        `)
        priceModal.open()

    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Are you sure?',
            content: `We delete product: ${videoCard.title}`
        }).then(() => {
            videoCards = videoCards.filter(el => el.id !== id)
            render()
            console.log('remove')
        }).catch(() => {
            console.log('cancel')
        })
    }

})

const priceModal = $.modal({
    title: 'Product price',
    closable: true,
    content: '',
    width: `400px`,
    footerButtons: [
        {
            text: 'Close',
            type: 'success',
            handler() {
                priceModal.close()
            }
        }
    ]
})