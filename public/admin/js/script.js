
// Button Status
const listButtonStatus = document.querySelectorAll("[button-status]");
if (listButtonStatus.length > 0) {
  let url = new URL(window.location.href);

  // Bắt sự kiện click
  listButtonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href;
    });
  });

  // Thêm class active mặc định
  const statusCurrent = url.searchParams.get("status") || "";
  const buttonCurrent = document.querySelector(`[button-status="${statusCurrent}"]`);
  if (buttonCurrent) {
    buttonCurrent.classList.add("active");
  }
}
//form search
const formSearch = document.querySelector("[form-search]");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const keyword = event.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    }
    else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}

// Phan trang
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if (listButtonPagination.length > 0) {
  let url = new URL(window.location.href);
  listButtonPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);
      console.log(page);
      window.location.href = url.href;
    })
  })
}
// button_change_status
// res.redirect tra ve cai router(chuyen huong giua cac trang trong file.pug)
//res.json tra data ve file js
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");
if (listButtonChangeStatus.length > 0) {
  listButtonChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const link = button.getAttribute("link");
      fetch(link, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.code == 200) {
            window.location.reload();
          }
        })
    });
  });
}
//checkBox
const checkAll = document.querySelector("input[name='checkAll']");

if (checkAll) {
  const listCheckItem = document.querySelectorAll("input[name='checkItem']");
  checkAll.addEventListener("click", () => {
    listCheckItem.forEach(item => {
      item.checked = checkAll.checked;
    });
  });

  listCheckItem.forEach(item => {
    item.addEventListener("click", () => {
      const listItemCheck = document.querySelectorAll("input[name='checkItem']:checked");
      if (listItemCheck.length == listCheckItem.length)
        checkAll.checked = true;
      else
        checkAll.checked = false;
    });
  });

}

// box action
const boxAction = document.querySelector("[box-actions]");
if (boxAction) {
  const button = boxAction.querySelector("button")
  button.addEventListener("click", () => {
    const select = boxAction.querySelector("select");
    const status = select.value;
    const listItemCheck = document.querySelectorAll("input[name='checkItem']:checked");
    const ids = [];
    listItemCheck.forEach(input => {
      ids.push(input.value);
    })
    if (status != " " && ids.length > 0) {
      const dataChangeMulti = {
        status: status,
        ids: ids
      }
      const link = boxAction.getAttribute("box-actions");
      console.log(link);
      fetch(link, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataChangeMulti),
      })
        .then(res => res.json())
        .then(data => {
          if (data.code == 200)
            window.location.reload();
        });
    }
    else {
      alert("Hành động và checkItem phải được chọn!");
    }
  });
}
//deleted
const buttonDeleted = document.querySelectorAll("[button-deleted]");
if (buttonDeleted.length > 0) {
  buttonDeleted.forEach(button => {
    button.addEventListener("click", () => {
      const link = button.getAttribute("button-deleted");
      console.log(link);
      fetch(link, {
        method: "PATCH"
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200) {
            window.location.reload();
          }
        })
    });
  })
}
// thay doi vi tri
const listInputPosition=document
.querySelectorAll("input[name='position']");
if(listInputPosition.length > 0) {
  listInputPosition.forEach(input => {
    input.addEventListener("change", () => {
      const link = input.getAttribute("link");
      const position = parseInt(input.value);

      fetch(link, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          position: position
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
    });
  })
}
const showAlert=document.querySelector("[show-alert]");
if(showAlert){
  let time=showAlert.getAttribute("show-alert")||3000;
  time=parseInt(time);
  setTimeout(()=>{
    showAlert.classList.add("hidden");
  },time);
}
const buttonUndeleted = document.querySelectorAll("[button-undeleted]");
if (buttonUndeleted.length > 0) {
  buttonUndeleted.forEach(button => {
    button.addEventListener("click", () => {
      const link = button.getAttribute("button-undeleted");
      console.log(link);
      fetch(link, {
        method: "PATCH"
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200) {
            window.location.reload();
          }
        })
    });
  })
}
//garbage delete-forever
const listButtonDeleteForever = document.querySelectorAll("[button-delete-forever]");
if(listButtonDeleteForever.length > 0) {
  listButtonDeleteForever.forEach(button => {
    button.addEventListener("click", () => {
      const link = button.getAttribute("button-delete-forever");
      console.log(link);
      fetch(link, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200) {
            //window.location.reload();
            console.log(data.code);
          }
        })
    });
  });
}
// preview anhr;
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", () => {
    const file = uploadImageInput.files[0];
    if(file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}