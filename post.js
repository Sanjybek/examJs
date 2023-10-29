//post запрос
const input = document.getElementById('shops__input')
const input2 = document.getElementById('shops__input_2')
const price = document.getElementById('price__input')
const imgInp  = document.getElementById('img__inp')

const btn = document.getElementById('cancellation__btn')
const saveBtn = document.getElementById('save__btn')


saveBtn.addEventListener('click', () => {
    const inputValue = input.value.trim()
    const inputValue2 = input2.value.trim()
    const inputPrice = price.value.trim()
    const inputImg = imgInp.value.trim()
    if(!inputValue && !inputValue2 && !inputPrice && !inputImg) return;

    const obj = {
      name: input.value,
      img: imgInp.value,
      price: price.value,
      title: input2.value,
    };
    postData(obj);
});

async function postData(obj) {
    try {
        const response = await fetch(url, {
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






