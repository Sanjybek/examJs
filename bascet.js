const basketUrl = 'http://localhost:3000/basket'


const basketUl = document.getElementById('basket__ul')
async function basketGet() {
    try{
        const res = await fetch(basketUrl)
        const basket = await res.json();
        basketTodo(basket)

    } catch (e) {
        console.log('Fetch data Error: ', e);
    }
}
basketGet()

function basketTodo(basket) {
    for (let i = 0; i < basket.length; i++) {
        const li = document.createElement('li')

        li.setAttribute('class', 'main__li');
        basketUl.appendChild(li)

        const img = document.createElement('img');
        img.setAttribute('class', 'main_img');
        img.src = basket[i].img
        li.appendChild(img)

        const h3 = document.createElement('h3');
        h3.innerText = basket[i].name
        li.appendChild(h3)


        const divDesc = document.createElement('div');
        divDesc.innerText = basket[i].price;
        li.appendChild(divDesc)



        const deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'Удалить'
        li.appendChild(deleteBtn)
        deleteBtn.addEventListener('click',() => {
            deleteData(basket[i].id)
        })
        
    }
}
async function deleteData(id) {
    try {
        await fetch(`${basketUrl}/${id}`,
         {method: 'DELETE'}); 
    } catch (e) {
        console.log('Fetch data Error: ', e);
    }
}
