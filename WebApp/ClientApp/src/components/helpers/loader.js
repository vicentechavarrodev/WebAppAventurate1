
export const loader = {
    show,
    hide
};

function show() {
    const loader_div = document.querySelector('.loader');
    return loader_div.classList.remove('loader--hide');
}

function hide() {
    const loader_div = document.querySelector('.loader');
    return loader_div.classList.add('loader--hide');
}


