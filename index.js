const taskcontainer = document.querySelector(".task__container");
console.log(taskcontainer);

//Global store
let globalStore=[];


const newCard = ({id , imageUrl , tasktitle , tasktype ,taskdescription}) => `<div class="p-2 col-md-6 col-lg-4 id=${id}">
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2 " style="background-color: #000000;">
    <button type="button" class="btn btn-outline-success" id=${id} onclick="editCard.apply(this,arguments)"><i class="fas fa-edit" id=${id} onclick="editCard.apply(this,arguments)"></i></button>
    <button type="button" class="btn btn-outline-danger " id=${id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id=${id} onclick="deleteCard.apply(this,arguments)"></i></button>
  </div>
  <img src="${imageUrl}" class="card-img-top" alt="cardtop">
  <div class="card-body">
    <h5 class="card-title">${tasktitle}</h5>
    <p class="card-text">${taskdescription}</p>
    <span class="badge bg-primary">${tasktype}</span>
  </div>
  <div class="card-footer text-muted " style="background-color: #000000;">
    <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
  </div>
</div>
</div>`

const loadInitialTaskCards = () => {
    const getInitialData = localStorage.getItem("Tasky");
    if(!getInitialData) return ;

    const {cards} = JSON.parse(getInitialData);

    cards.map ((cardObject) => {
        const createNewCard = newCard (cardObject);
        taskcontainer.insertAdjacentHTML("beforeend" , createNewCard);
        globalStore.push(cardObject);
    }
    ) ;
};

const saveChanges = () => {
    const taskData ={
        id:`${Date.now()}`,
        imageUrl:document.getElementById("imageurl").value,
        tasktitle:document.getElementById("tasktitle").value,
        tasktype:document.getElementById("tasktype").value,
        taskdescription:document.getElementById("taskdescription").value,
    };
     const createNewCard = newCard (taskData);
     taskcontainer.insertAdjacentHTML("beforeend" , createNewCard);
     globalStore.push(taskData);
     localStorage.setItem("Tasky" , JSON.stringify({cards:globalStore}))
     
} ;

const deleteCard = (event) => {
  //id
  event=window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;
  //search
  const newUpdatedArray = globalStore.filter ((cardObject) => targetID !== cardObject.id); 
  globalStore= newUpdatedArray ;
  localStorage.setItem("Tasky" ,JSON.stringify({cards:globalStore}))
  //Access DOM

  if(tagname === "BUTTON") {
    //task__container
    return event.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      event.target.parentNode.parentNode.parentNode);
  }

  return event.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
    event.target.parentNode.parentNode.parentNode.parentNode);
}

const editCard = (event) => {
  event=window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  let parentElement ;

  if (tagname === "BUTTON"){
    parentElement = event.target.parentNode.parentNode;
  }
  else{
    parentElement = event.target.parentNode.parentNode.parentNode;
  }
 
  let tasktitle = parentElement.childNodes[5].childNodes[1];
  let taskdescription = parentElement.childNodes[5].childNodes[3];
  let tasktype = parentElement.childNodes[5].childNodes[5];
  let submitButton = parentElement.childNodes[7].childNodes[1];

  tasktitle.setAttribute ("contenteditable" ,"true");
  taskdescription.setAttribute ("contenteditable" ,"true");
  tasktype.setAttribute ("contenteditable" ,"true");
  submitButton.innerHTML="Save Changes";
  

};