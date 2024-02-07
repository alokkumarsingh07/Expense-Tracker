function submitForm() {
  const amount = document.getElementById("amt").value;
  const des = document.getElementById("des").value;
  const cat = document.querySelector("#cat-val").value;

  let obj_details = {
    des: des,
    cat: cat,
  };

  console.log(amount);
  console.log(obj_details);
  let obj_serialized = JSON.stringify(obj_details);
  localStorage.setItem(amount, obj_serialized);
  refresh();
}

function deleteItem(e) {
  if (confirm("Are You Sure?")) {
    const li = e.target.parentElement;
    const liContent = li.innerText;
    const str = liContent.split("-");
    const key = str[0].trim();

    const list = document.getElementById("listCon");
    list.removeChild(li);

    localStorage.removeItem(key);
  }
}

function refresh() {
  removeAll();

  for (const key of Object.keys(localStorage)) {
    const amt = key;

    const obj_deserialized = JSON.parse(localStorage.getItem(key));

    const des = obj_deserialized.des;
    const cat = obj_deserialized.cat;

    const val = amt + " - " + cat + " - " + des + "  ";

    const list = document.getElementById("listCon");

    const li = document.createElement("li");
    li.appendChild(document.createTextNode(val));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-primary";
    deleteBtn.onclick = deleteItem;
    deleteBtn.appendChild(document.createTextNode("Delete"));
    deleteBtn.style.marginLeft = "7px";
    deleteBtn.style.background = "red";
    li.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-primary";
    editBtn.onclick = editItem;
    editBtn.appendChild(document.createTextNode("Edit"));
    editBtn.style.marginLeft = "7px";
    editBtn.style.background = "green";
    li.appendChild(editBtn);

    li.style.padding = "5px";
    list.appendChild(li);
  }
}

function removeAll() {
  const list = document.getElementById("listCon");

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

function editItem(e) {
  const li = e.target.parentElement;
  const liContent = li.innerText;
  const str = liContent.split("-");

  const key = str[0].trim();
  const ind = str[2].indexOf(" ");

  const list = document.getElementById("listCon");
  list.removeChild(li);

  localStorage.removeItem(key);

  const amt = document.getElementById("amt");
  const des = document.getElementById("des");
  const cat = document.querySelector("#cat-val");

  amt.value = str[0].trim();
  des.value = str[2].replace(" DeleteEdit", "");
  cat.value = str[1].trim();
}
