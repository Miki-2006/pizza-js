const pizzas = [
    {
      id: 0,
      name: "Бургер-пицца",
      price: 445,
      imgUrl:
        "https://media.dodostatic.net/image/r:584x584/11ee7d60266964ffa4a49159f0a96a1e.avif",
      counter: 0,
      category: "Закрытые",
    },
    {
      id: 1,
      name: "Цыпленок карри",
      price: 475,
      imgUrl:
        "https://media.dodostatic.net/image/r:584x584/11ee7d6009411cba8ea4dd066b9c0fab.avif",
      counter: 0,
      category: "Гриль",
    },
    {
      id: 2,
      name: "Сырная",
      price: 295,
      imgUrl:
        "https://media.dodostatic.net/image/r:584x584/11ee7d600bc7b9f1b6888af021e5c198.avif",
      counter: 0,
      category: "Вегетарианская",
    },
    {
      id: 3,
      name: "Ветчина и сыр",
      price: 295,
      imgUrl:
        "https://media.dodostatic.net/image/r:584x584/11ee7d60109d7d49bf0ac5bcad0f9679.avif",
      counter: 0,
      category: "Мясные",
    },
    {
      id: 4,
      name: "Пепперони Фреш",
      price: 325,
      imgUrl:
        "https://media.dodostatic.net/image/r:584x584/11eee203876d817b90fb82ea8158bf5d.avif",
      counter: 0,
      category: "Мясные",
    },
    {
      id: 5,
      name: "Двойной цыпленок",
      price: 325,
      imgUrl:
        "https://media.dodostatic.net/image/r:584x584/11ee7d601dd7a15c85b8f38026f12402.avif",
      counter: 0,
      category: "Гриль",
    },
    {
      id: 6,
      name: "Ветчина и грибы",
      price: 445,
      imgUrl:
        "https://media.dodostatic.net/image/r:584x584/11ee7d600de7d9c58e21a5d97f45c605.avif",
      counter: 0,
      category: "Мясные",
    },
    {
      id: 7,
      name: "Маргарита",
      price: 445,
      imgUrl:
        "https://media.dodostatic.net/image/r:584x584/11ee7d5ffa55d940a5174b17ee35c316.avif",
      counter: 0,
      category: "Вегетарианская",
    },
];

const categories = [
  "Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые" 
]

const contentItems = document.querySelector('.content__items')
const contentTitle = document.querySelector('.content__title')

const renderCategory = (array) => {
  const categoriesDiv = document.querySelector('.categories ul')
  array.forEach(el => {
    categoriesDiv.innerHTML += `<li class=${el === 'Все' ? 'active' : ''}>${el}</li>`
  })
}
renderCategory(categories)


const renderCatalog = (meals) => {
  contentItems.innerHTML = ''
  meals.length > 0
  ?
  meals.forEach(el => {
    contentItems.innerHTML += `<div class="pizza-block" id="${el.id}">
    <img class="pizza-block__image"
    src="${el.imgUrl}"
    alt="Pizza" />
    <h4 class="pizza-block__title">${el.name}</h4>
    <div class="pizza-block__selector">
    <ul class="type">
    <li class="active">тонкое</li>
    <li>традиционное</li>
    </ul>
    <ul class="size">
    <li class="active">26 см</li>
    <li>30 см</li>
    <li>40 см</li>
    </ul>
    </div>
    <div class="pizza-block__bottom">
    <div class="pizza-block__price">от ${el.price} ₽</div>
    <div class="button button--outline button--add">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
    fill="white" />
    </svg>
    <span>Добавить</span>
    </div>
    </div>
    </div>`
  })
  :
  contentItems.innerHTML = 'В этой категории нету пицц'
}
renderCatalog(pizzas)


const clickToCategory = () => {
  const categories = document.querySelectorAll('.categories ul li')
  categories.forEach(el => {
    el.addEventListener('click', () => {
      const categoryMeals = []
      categories.forEach(el => el.classList.remove('active'))
      el.classList.add('active')
      pizzas.filter(item => {
        if(item.category === el.textContent){
          contentTitle.innerHTML = `${el.textContent}`
          categoryMeals.push(item)
        } else if(el.textContent === 'Все'){
          contentTitle.innerHTML = `${el.textContent}`
          categoryMeals.push(item)
        }
      })
      renderCatalog(categoryMeals)
      renderPizza(categoryMeals)
    })
    
  })
}
clickToCategory()

const showPopup = () => {
  document.querySelector('.sort__label svg').addEventListener('click', () => {
    document.querySelector('.sort__popup').style.overflow = "visible"
    document.querySelector('.sort__popup ul').style.overflow = "visible"
    
    document.querySelectorAll('.sort__popup ul li').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.sort__popup ul li').forEach(el => el.classList.remove('active'))
        el.classList.add('active')
        sortPizzas(el.textContent)
      })
    })
  })
}
showPopup()

const sortPizzas = (category) => {
  if(category === 'популярности'){
    renderCatalog(pizzas.sort((a, b) => {
      if(a.id > b.id){
        return 1
      } else if(a.id < b.id){
        return -1
      } else return 0
      
    }))
  } else if(category === 'цене'){
    renderCatalog(pizzas.sort((a, b) => {
      if(a.price > b.price){
        return 1
      } else if(a.price < b.price){
        return -1
      } else return 0
      
    }))
  } else if(category === 'алфавиту'){
    renderCatalog(pizzas.sort((a, b) => {
      if(a.name > b.name){
        return 1
      } else if(a.name < b.name){
        return -1
      } else return 0
      
    }))
  }
}



const renderPizza = (pizzes) => {
  let pizzasToBusket = []
  JSON.parse(localStorage.getItem('busket')) !== null ? pizzasToBusket.push(...JSON.parse(localStorage.getItem('busket'))) : ''
  pizzes.forEach(pizza => { 
    const buttonOfPizza = document.getElementById(`${pizza.id}`).querySelectorAll('.pizza-block__bottom .button.button--outline.button--add')
    const typeOfPizza = document.getElementById(`${pizza.id}`).querySelectorAll('.pizza-block__selector .type li')
    const sizeOfPizza = document.getElementById(`${pizza.id}`).querySelectorAll('.pizza-block__selector .size li')
    
    typeOfPizza.forEach(el => {
      el.addEventListener('click', () => {
        typeOfPizza.forEach(item => item.classList.remove('active'))
        el.classList.add('active')
      })
    })
    sizeOfPizza.forEach(el => {
      el.addEventListener('click', () => {
        sizeOfPizza.forEach(item => item.classList.remove('active'))
        el.classList.add('active')
      })
    })
    
    buttonOfPizza.forEach(el => {
      el.addEventListener('click', () => {
        pizzes.find(item => {
          if(item.id === pizza.id){
            if(pizzasToBusket.some(it => it.id === pizza.id && it.size === findSize(pizza.id) && it.type === findType(pizza.id))){
              for (let i = 0; i < pizzasToBusket.length; i++) {
                if (pizzasToBusket[i].id === pizza.id && pizzasToBusket[i].size === findSize(pizza.id) && pizzasToBusket[i].type === findType(pizza.id)) {
                  pizzasToBusket[i].counter++
                  return;
                }
              }
            } else {
              pizzasToBusket.push({...item, size: findSize(pizza.id), type: findType(pizza.id), counter: 1})
            }
          }
        })
        localStorage.setItem('busket', JSON.stringify(pizzasToBusket))
        document.querySelector('.totalPizzas').innerHTML = pizzasToBusket.reduce((acc, el) => acc + el.counter, 0)
        document.querySelector('.totalSum').innerHTML = pizzasToBusket.reduce((acc, el) => acc + (el.price * el.counter), 0)
      })
    })
  })
}
renderPizza(pizzas)

const findSize = (id) => {
  return document.getElementById(`${id}`).querySelector('.pizza-block__selector .size li.active').innerHTML
}
const findType = (id) => {
  return document.getElementById(`${id}`).querySelector('.pizza-block__selector .type li.active').innerHTML
}

const pizzasFromLocalStorage = JSON.parse(localStorage.getItem('busket'))
const sumOfPrice = () => {
  const sumOfPricePizzas = JSON.parse(localStorage.getItem('busket')).length !== 0 ? JSON.parse(localStorage.getItem('busket')).reduce((acc, el) => acc + (el.price * el.counter), 0) : 0
  document.querySelector('.totalSum').innerHTML = sumOfPricePizzas 
  return sumOfPricePizzas
}
sumOfPrice()

const sumOfPizzas = () => {
  const pizzas = JSON.parse(localStorage.getItem('busket')).length !== 0 ? JSON.parse(localStorage.getItem('busket')).reduce((acc, el) => acc + el.counter, 0) : 0
  document.querySelector('.totalPizzas').innerHTML = pizzas
  return pizzas
}
sumOfPizzas()

document.querySelector('.totalPizzas').innerHTML = pizzasFromLocalStorage?.length | 0
document.querySelector('.header__cart').addEventListener('click', (e) => {
  e.preventDefault()
  renderBusket()
})

const renderBusket = () => {
  JSON.parse(localStorage.getItem('busket')).length !== 0 
  ?
  document.querySelector('.content').innerHTML = `
  <div class="container container--cart">
  <div class="cart">
  <div class="cart__top">
  <h2 class="content__title"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path
  d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
  stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
  <path
  d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
  stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
  <path
  d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
  stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
  Корзина</h2>
  <div class="cart__clear">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.5 5H4.16667H17.5" stroke="#B6B6B6" stroke-width="1.2" stroke-linecap="round"
  stroke-linejoin="round" />
  <path
  d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
  stroke="#B6B6B6" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M8.33337 9.16667V14.1667" stroke="#B6B6B6" stroke-width="1.2" stroke-linecap="round"
  stroke-linejoin="round" />
  <path d="M11.6666 9.16667V14.1667" stroke="#B6B6B6" stroke-width="1.2" stroke-linecap="round"
  stroke-linejoin="round" />
  </svg>
  
  <span>Очистить корзину</span>
  </div>
  </div>
  <div class="content__items"> 
  ${renderCards()}
  </div>
  <div class="cart__bottom">
  <div class="cart__bottom-details">
  <span> Всего пицц: <b>${sumOfPizzas()} шт.</b> </span>
  <span> Сумма заказа: <b>${sumOfPrice()} ₽</b> </span>
  </div>
  <div class="cart__bottom-buttons">
  <a href="/" class="button button--outline button--add go-back-btn">
  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" stroke-width="1.5" stroke-linecap="round"
  stroke-linejoin="round" />
  </svg>
  
  <span>Вернуться назад</span>
  </a>
  <div class="button pay-btn">
  <span>Оплатить сейчас</span>
  </div>
  </div>
  </div>
  </div>
  </div>`
  :
  document.querySelector('.content').innerHTML =` <div class="container container--cart">
  <div class="cart cart--empty">
  <h2>Корзина пустая <icon>😕</icon></h2>
  <p>
  Вероятней всего, вы не заказывали ещё пиццу.<br />
  Для того, чтобы заказать пиццу, перейди на главную страницу.
  </p>
  <img src="/img/empty-cart.png" alt="Empty cart" />
  <a href="/" class="button button--black">
  <span>Вернуться назад</span>
  </a>
  </div>
  </div>`
  deletePizzasFromBusket()

}

const renderCards = () => {
  return (JSON.parse(localStorage.getItem('busket')).map(el => (
    `<div class="cart__item" id=${el.id}>
    <div class="cart__item-img">
    <img class="pizza-block__image"
    src=${el.imgUrl}
    alt="Pizza" />
    </div>
    <div class="cart__item-info">
    <h3>${el.name}</h3>
    <p>${el.type} тесто, ${el.size}</p>
    </div>
    <div class="cart__item-count">
    <div class="button button--outline button--circle cart__item-count-minus" onClick="munisCountOfPizza(${el.id},'${el.size}','${el.type}')">
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
    d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
    fill="#EB5A1E" />
    <path
    d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
    fill="#EB5A1E" />
    </svg>
    
    </div>
    <b>${el.counter}</b>
                <div class="button button--outline button--circle cart__item-count-plus" onClick="plusCountOfPizza(${el.id},'${el.size}','${el.type}')">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E" />
                <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E" />
                </svg>
                
                </div>
                </div>
                <div class="cart__item-price">
                <b>${el.price * el.counter} ₽</b>
                </div>
                <div class="cart__item-remove" >
                <div class="button button--outline button--circle"onClick="deletePizza(${el.id}, '${el.size}', '${el.type}')">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E" />
                <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E" />
                </svg>
                
                </div>
                </div>
                </div>
                
                
                `
              )) 
            )
          }
          
const deletePizzasFromBusket = () => {
  document.querySelector('.cart__clear')?.addEventListener('click', () => {
    const pizzasFromLocalStorage = ''
    localStorage.setItem('busket', JSON.stringify(pizzasFromLocalStorage))
    document.querySelector('.content').innerHTML =` <div class="container container--cart">
    <div class="cart cart--empty">
    <h2>Корзина пустая <icon>😕</icon></h2>
    <p>
    Вероятней всего, вы не заказывали ещё пиццу.<br />
    Для того, чтобы заказать пиццу, перейди на главную страницу.
    </p>
    <img src="/img/empty-cart.png" alt="Empty cart" />
    <a href="/" class="button button--black">
    <span>Вернуться назад</span>
    </a>
    </div>
    </div>`
    document.querySelector('.totalPizzas').innerHTML = 0
    document.querySelector('.totalSum').innerHTML = 0
  })
}

const deletePizza = (id, size, type) => {
  const pizzasFromStorage = JSON.parse(localStorage.getItem('busket'))
  // localStorage.setItem('busket', JSON.stringify(pizzasFromStorage.filter(el => el.id !== id && el.size !== size && el.type !== type)))
  // renderCards()
  const fff = pizzasFromStorage.filter(el => {
    if(el[id] !== id && el[size] !== size && el[type] !== type){
      return el
    }
  })
  console.log(fff);
} 

const munisCountOfPizza = (id,size,type) => {
  const pizzasFromStorage = JSON.parse(localStorage.getItem('busket'))
   if(pizzasFromStorage.some(it => it.id === id && it.size === size && it.type === type)){
    pizzasFromStorage.map(el => {
      if (el.id === id && el.size === size && el.type === type) {
        el.counter--
        document.getElementById(`${el.id}`).querySelector('.cart__item-count b').innerHTML = el.counter 
        document.getElementById(`${el.id}`).querySelector('.cart__item-price b').innerHTML = (el.counter * el.price) + ' ₽'
        return;
      }
    })
  }
  localStorage.setItem('busket', JSON.stringify(pizzasFromStorage))
  document.querySelector('.totalPizzas').innerHTML = `${pizzasFromStorage.reduce((acc, el) => acc + el.counter, 0)} `
  document.querySelector('.totalSum').innerHTML = `${pizzasFromStorage.reduce((acc, el) => acc + (el.price * el.counter), 0)}`
  document.querySelectorAll('.cart__bottom-details span b')[0].innerHTML = `${pizzasFromStorage.reduce((acc, el) => acc + el.counter, 0)} ${'шт.'}`
  document.querySelectorAll('.cart__bottom-details span b')[1].innerHTML = `${pizzasFromStorage.reduce((acc, el) => acc + (el.price * el.counter), 0)} ${'₽'}`
}

const plusCountOfPizza  = (id,size,type) => {
  const pizzasFromStorage = JSON.parse(localStorage.getItem('busket'))
   if(pizzasFromStorage.some(it => it.id === id && it.size === size && it.type === type)){
    pizzasFromStorage.map(el => {
      if (el.id === id && el.size === size && el.type === type) {
        el.counter++
        document.getElementById(`${el.id}`).querySelector('.cart__item-count b').innerHTML = el.counter
        document.getElementById(`${el.id}`).querySelector('.cart__item-price b').innerHTML = el.counter * el.price  + ' ₽'
        return;
      }
    })
  }
  localStorage.setItem('busket', JSON.stringify(pizzasFromStorage))
  document.querySelector('.totalPizzas').innerHTML = `${pizzasFromStorage.reduce((acc, el) => acc + el.counter, 0)} `
  document.querySelector('.totalSum').innerHTML = `${pizzasFromStorage.reduce((acc, el) => acc + (el.price * el.counter), 0)}`
  document.querySelectorAll('.cart__bottom-details span b')[0].innerHTML = `${pizzasFromStorage.reduce((acc, el) => acc + el.counter, 0)} ${'шт.'}`
  document.querySelectorAll('.cart__bottom-details span b')[1].innerHTML = `${pizzasFromStorage.reduce((acc, el) => acc + (el.price * el.counter), 0)} ${'₽'}`
}