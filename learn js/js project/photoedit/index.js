const choose_img_btn = document.querySelector('.choose_img button')
let choose_input = document.querySelector('.choose_img input')
let imgSrc = document.querySelector('.view_img img')
let filter_name = document.querySelector(".filter_info .name")
let filter_btn = document.querySelectorAll('.icons_room button')
let slider = document.querySelector('.slider input')
let slider_value = document.querySelector('.slider .value')
let rotate_btns = document.querySelectorAll('.icons_room1 button')
let reset = document.querySelector('.reset')
let save = document.querySelector('.save')


let brightness = 100 , contrast = 100 , saturate = 100 , invert = 0 , Blur = 0 , rotate = 0 , flip_x = 1, flip_y = 1;

choose_img_btn.addEventListener('click' , () => { choose_input.click()})
choose_input.addEventListener('change' , () => {
     let file = choose_input.files[0];
     imgSrc.src =  URL.createObjectURL(file);
     document.querySelector('.container').classList.remove('disabled')
})

filter_btn.forEach(element => {
    element.addEventListener('click', () => {
        document.querySelector('.active').classList.remove('active')
        element.classList.add('active')
        filter_name.innerText = element.id;
        if (element.id === "brightness") {
            slider.max = "200";
            slider.value = brightness;
            slider_value.innerText = `${brightness}`;
        }else if(element.id === "contrast") {
            slider.max = "200";
            slider.value = contrast;
            slider_value.innerText = `${contrast}`;
        }else if(element.id === "saturate") {
            slider.max = "200";
            slider.value = saturate;
            slider_value.innerText = `${saturate}`;
        }else if(element.id === "lur") {
            slider.max = "100";
            slider.value = Blur;
            slider_value.innerText = `${Blur}`;
        }
    })
})

slider.addEventListener('input', () => {
    slider_value.innerHTML = `${slider.value}%`;
    let silderState = document.querySelector('.icons_room .active')
    if (silderState.id === "brightness") {
        brightness = slider.value;
    }else if (silderState.id === "contrast") {
         contrast = slider.value;
    }else if (silderState.id === "saturate") {
        saturate = slider.value;
   }else if (silderState.id === "invert") {
        invert = slider.value;
   }else if (silderState.id === "blur") {
        Blur = slider.value;
   }
    imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%)  blur(${Blur}px)`;
})

rotate_btns.forEach(element => {
    element.addEventListener('click' , () => {
        if (element.id === "rotate_left") {
            rotate -= 90;
            console.log(rotate);
        }else if (element.id === "rotate_right") {
            rotate += 90;
        }else if (element.id === "flip_x") {
            flip_x = flip_x === 1 ? -1 : 1;
        }else if (element.id === "flip_y") {
            flip_y = flip_y === 1 ? -1 : 1;
        }
        imgSrc.style.transform = `rotate(${rotate}deg) scale(${flip_x} , ${flip_y})`;
    })
});

reset.addEventListener('click' , () => {
    let brightness = "100" , contrast = "100" , saturate = "100" , invert = "0" , Blur = "0" , rotate = "0" , flip_x = "1", flip_y = "1";
    imgSrc.style.transform = `rotate(${rotate}deg) scale(${flip_x} , ${flip_y})`;
    imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%)  blur(${Blur}px)`;
})

save.addEventListener("click", () => {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = imgSrc.naturalWidth;
    canvas.height = imgSrc.naturalHeight;
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${Blur}px)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(flip_x, flip_y);
    ctx.drawImage(
      imgSrc,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
});