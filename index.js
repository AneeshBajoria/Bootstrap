const taskcontainer = document.querySelector(".task__container");
console.log("taskcontainer");

const newCard = ({id , imageUrl , tasktitle , tasktype ,taskdescription}) => `<div class="col-md-6 col-lg-4 id=${id}">
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2 ">
    <button type="button" class="btn btn-outline-success"><i class="fas fa-edit"></i></button>
    <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
  </div>
  <img src="${imageUrl}" class="card-img-top" alt="cardtop">
  <div class="card-body">
    <h5 class="card-title">${tasktitle}</h5>
    <p class="card-text">${taskdescription}</p>
    <span class="badge bg-primary">${tasktype}</span>
  </div>
  <div class="card-footer text-muted ">
    <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
  </div>
</div>
</div>`

const saveChanges = () => {
    const taskData ={
        id:`${Date.now()}`,
        imageUrl:document.getElementById("imageurl").value,
        tasktitle:document.getElementById("tasktitle").value,
        tasktype:document.getElementById("tasktype").value,
        taskdescription:document.getElementById("taskdescription").value,
    };
     const createNewCard = newCard (taskData);
     taskcontainer.insertAdjacentHTML("beforeend" , createNewCard)
} ;