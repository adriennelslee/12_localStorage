
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.tasks');
const items = JSON.parse(localStorage.getItem('items')) || [];
const deleteItems = document.querySelector('.delete');

function addItem(event){
    event.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text, 
        done: false
    };
    
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem("items", JSON.stringify(items));
    this.reset();
}

function populateList(tasks = [], tasksList) {
    tasksList.innerHTML = tasks.map((task, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${task.done ? 'checked' : ''} />
                <label for="item${i}">${task.text}</label>
            </li>
        `;
    }).join('');
}

function toggleDone(event){
    if(!event.target.matches("input")) return;
    const el = event.target; 
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
}

function clearList(){
    window.localStorage.removeItem("items");
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
deleteItems.addEventListener("click", clearList);
populateList(items, itemsList);