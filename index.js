//GET
var apiUrl = "https://reqres.in/api/users";

fetch(apiUrl)
    .then((response) => response.json())
    .then((json) => {
        console.log(json.data);
        const markup = json.data.map((element) => {
            return `
            <tr id="row-${element.id}">
            <td>${element.id}</td>
                     <td>${element.email}</td>
                     <td>${element.first_name}</td>
                     <td>${element.last_name}</td>
                     <td>
                       <img src="${element.avatar}" width="70px"/>
                     </td>
                     <td>
                       <a href="edit-user.html?id=${element.id}" class="btn btn-success" >Sửa</a>
                       &nbsp;<button class="btn btn-danger"  onclick="removeElement(${element.id})">Xoá</button>
                     </td>
            </tr>`;
        });
        console.log(markup);
        document.querySelector("tbody").innerHTML = markup.join("");
    });

function removeElement(removeId) {
    //     //confirm
    Swal.fire({
        title: "Chắc chắn xóa users?",
        text: "Sau khi xóa sẽ không lấy lại dữ liệu được!",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý!",
        cancelButtonText: "Không đồng ý!",
    }).then((result) => {
        if (result.value) {
            //gửi request lên server
            // alert("đã xóa");
            var deleteUrl = apiUrl + "/" + removeId;
            axios
                .delete(deleteUrl)
                .then((response) => {
                    console.log(response);
                })
                .then(() => {
                    var removeElement = document.querySelector("#row-" + removeId);
                    removeElement.remove();
                    Swal.fire({
                        position: "bottom-end",
                        icon: "success",
                        title: "Đã xóa",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                });
        }
    });
}