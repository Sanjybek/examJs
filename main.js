
const url = 'http://localhost:3000/data'

const ul = document.getElementById('main__ul')
const divBlock = document.getElementById('basket__div')
const sBlock = document.getElementById('block')
const liNone = document.getElementById('li__none')
const border = document.getElementById('border')

let sortJson;

//редактирования
const patchNone = document.getElementById('patch__none')
patchNone.style.display = 'none'

const putTitle = document.getElementById('shops__input')
const putDesc = document.getElementById('shops__input_2')
const putPrice = document.getElementById('price__input')
const putImg = document.getElementById('img__inp') 
let putId;

const putBtn = document.getElementById('save__btn')

const loading = document.getElementById('loading')


//get запрос
async function getdata() {
    try {
        const res = await fetch(url)
        const data = await res.json();
        console.log(data);
        displayTodo(data)
        sortJson = data
        
    } catch (e) {
        console.log('Fetch data Error: ', e);
    }
}
getdata()



function displayTodo(data) {
    for (let i = 0; i < data.length; i++) {

        liNone.style.display = 'none'
        // btnNone.style.display = 'block'
        

        const li = document.createElement('li');
        li.setAttribute('class', 'main__li');
        ul.appendChild(li);

        const img = document.createElement('img');
        img.setAttribute('class', 'main_img');
        img.src = data[i].img;
        li.appendChild(img);
        img.addEventListener('click', function () {
            displayBlock(img.src, data[i].name, data[i].title)
        })
    
        const h3 = document.createElement('h3');
        h3.innerText = data[i].name;
        li.appendChild(h3);
        
        const desc = document.createElement('p');
        desc.innerText = data[i].title;
        desc.style.display = 'none';
        li.appendChild(desc);
    
        const divDesc = document.createElement('div');
        li.appendChild(divDesc);
        divDesc.innerText = data[i].price;
        
        
        //редактирования
        const button = document.createElement('button');
        button.innerText = 'Редактировать';
       
        li.appendChild(button)
        button.addEventListener('click',() => {
            putId = data[i].id
            putTitle.value = data[i].name
            putDesc.value = data[i].title
            putPrice.value = data[i].price
            putImg.value = data[i].img


            ul.style.display = 'none'
            sBlock.style.display = 'none'
            border.style.display = 'none'
            patchNone.style.display = 'block'
        })

        
        //Добавить в корзину
        const button2 = document.createElement('button');
        li.appendChild(button2);
        button2.innerText = 'Добавить в корзину';
        li.appendChild(button2)
        button2.addEventListener('click',() => {
            basketPost(data[i])
        })
       
    }
}

//редактирования
async function putObj(putObj) {
    try {
        await fetch(`${url}/${putId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(putObj),
        });
        getdata()

       
    } catch (error) {
        console.error('Error partially updating data:', error);
    }
}
putBtn.addEventListener('click', () => {
    console.log('dkfcjgv');
    const obj = {
        name: putTitle.value,
        img: putImg.value,
        price: putPrice.value,
        title: putDesc.value
    }
    putObj(obj)
})


//Добавить в корзину
async function basketPost(obj) {
    try {
        const response = await fetch(basketUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(obj),
        });
        const result = await response.json();
        console.log(result);
    } catch (e) {
        console.log('Fetch data Error: ', e);
    }
}





//подробный информатция

function displayBlock(newImg, newName, newTitle) {
    sBlock.style.display = 'none'
    border.style.display = 'none'
    liNone.style.display = 'block'

    const h3 = document.createElement('h3');
    h3.setAttribute('class', 'h3__title')
    divBlock.appendChild(h3);
    h3.innerText = newName;

    ul.innerHTML = '';
    const div = document.createElement('div');
    div.setAttribute('class', 'info__div');
    divBlock.appendChild(div);
    
    const blockImg = document.createElement('img');
    blockImg.setAttribute('class', 'section__img');
    blockImg.src = newImg;
    div.appendChild(blockImg);
    
    const desc = document.createElement('p');
    desc.innerText = newTitle;
    div.appendChild(desc);
}


const sortPrice = document.getElementById('sort')


//Сортировка по цене

let isAscendingSort = true;

sortPrice.addEventListener('click', () => {
    const newI = sortJson.map((e) =>  e);
    
    if (isAscendingSort) {
        newI.sort((a, b) => a.price - b.price);
    } else {
        newI.sort((a, b) => b.price - a.price);
    }

    isAscendingSort = !isAscendingSort; 
    
    ul.innerHTML = '';
    displayTodo(newI);
});





const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click',() => {
    const title = searchInput.value.toLowerCase();  
    const loading = sortJson.filter((Lname) => Lname.name.toLowerCase().includes(title))
    ul.innerHTML = ''
    displayTodo(loading)
})




