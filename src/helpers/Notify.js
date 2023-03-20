import Toastify from "toastify-js";
export default {
    success(text){
        Toastify({
            text: text,
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            className: "toastify-success",
            
          }).showToast();
    },
    error(text){
        Toastify({
            text: text,
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #C81F70, #D19592)",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            className: "toastify-error",
            
          }).showToast();
    },
    warning(text){
        Toastify({
            text: text,
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #5c1ac3, #F9484A)",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            className: "toastify-warning",
            
          }).showToast();
    }
}