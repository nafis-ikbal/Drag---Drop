// <------------for drag & drop between 2 containers------------>
const cont1 = document.querySelector(".container1");
const cont2 = document.querySelector(".container2");
const box = document.querySelectorAll(".box");
const info = document.querySelector(".info");
let selectedItem = null;  //for store dragged box 

// Add listeners to draggable items (box)
for(let item of box) {
  item.addEventListener("dragstart" , (e) => {
    selectedItem = e.target;
  });

  item.addEventListener("dragend" , () => {
    selectedItem = null;
  });
}

// Add listeners to drop containers
[cont1, cont2].forEach(container => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();  //stop browser default preventing droping elements
  });
    
  container.addEventListener("drop", (e) => {
    if (selectedItem) {
      e.preventDefault();
      container.appendChild(selectedItem);
    }
  });
});


// <------------for drag & drop from local system------------>
const dropArea = document.querySelector(".drop-area");

//when user start drag an image
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, (e) => {
    e.preventDefault();
    dropArea.classList.add("drag-img");
  });
});

//when user drop an image
['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, (e) => {
    e.preventDefault();
    dropArea.classList.remove("drag-img");
  });
});

function handleDrop(e) {
  const file = e.dataTransfer.files[0];

  if (file) {
    // Check if the file is an image
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();  //create object that read img/file

      reader.onload = () => {
        const img = document.createElement('img'); //create image elemnt
        img.src = reader.result;
        img.classList.add('w-full', 'h-full', 'object-contain'); 
        dropArea.innerHTML = ''; // Clear the drop area content
        dropArea.appendChild(img);
      };

      reader.readAsDataURL(file);  //read the img/file
      dropArea.classList.add('border-transparent');
    } else {
      info.innerHTML = "Please drop a .png or .jpg file!";
    }
  }
}

dropArea.addEventListener("drop" , handleDrop);
