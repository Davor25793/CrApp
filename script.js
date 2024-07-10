const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


//Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('keyup', filterItems);



//Function filter items
function filterItems(e){

   const text = e.target.value.toLowerCase();
   const lis = [...document.querySelectorAll('li')];
   lis.forEach(li => {
    if(li.textContent.toLowerCase().includes(text)){
        li.style.display = 'flex';
    }else{
        li.style.display = 'none';
    }
   })
    
    
}



//Clear items
function clearItems(){
    itemList.innerHTML = '';
    clearAllItemsFromLs();
    checkUI()
}


//Clear all items from ls
function clearAllItemsFromLs(){
    localStorage.clear();
}

//Remove item from local storage
function removeItemFromLocalStorage(item){

    let items;

    if(localStorage.getItem('items') === null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'))
    }

    //Loop through items
    items.forEach((listItem, index) => {
       if(item.textContent === listItem){
        items.splice(index, 1)
       }
    })

    localStorage.setItem('items', JSON.stringify(items));

}


//Remove item 
function removeItem(e){
  if(e.target.parentElement.classList.contains('remove-item')){
    e.target.parentElement.parentElement.remove()
    removeItemFromLocalStorage(e.target.parentElement.parentElement)
    checkUI()
  }
}

//Check UI
function checkUI(){

    const items = document.querySelectorAll('li');

    if(items.length === 0){
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }else{
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }   
}


//Add item 
function onAddItemSubmit(e){
    
    const newItem = itemInput.value;

    //Validate input
    if(newItem === ''){
        alert('Please add an item')
        return;
    }

    //Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red')
    
    li.appendChild(button);

    itemList.appendChild(li);

    checkUI();

    addItemToLocalStorage(newItem);

    itemInput.value = '';

    e.preventDefault();
}


//Add item to local storage
function addItemToLocalStorage(item){

    let items;

    if(localStorage.getItem('items') === null){
        items = []
    }else{
        items = JSON.parse(localStorage.getItem('items'))
    }

    items.push(item);

    localStorage.setItem('items', JSON.stringify(items));


}


//Show items from local storage
document.addEventListener('DOMContentLoaded',  showItemsFromLs);


//Show items from local storage
document.addEventListener('DOMContentLoaded',  showItemsFromLs);


//Show items from LS
function showItemsFromLs(){
    let items;

    if(localStorage.getItem('items') === null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'))
    }

    //Loop through items
    items.forEach(item => {
         //Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red')
    
    li.appendChild(button);

    itemList.appendChild(li);
    })

    checkUI();

}


//Create Button
function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

//Create Icon
function createIcon(classes){
    const icon = document.createElement('i')
    icon.className = classes;
    return icon;
}


checkUI()