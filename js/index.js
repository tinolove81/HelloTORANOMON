const RWDWIDTH = 1200;
let WIDTH = window.innerWidth;

window.onresize = () => {
    WIDTH = window.innerWidth;
    WIDTH > RWDWIDTH ? waterfall('.main-content.waterfall', '.content') : false;
}

window.onload = () => {

    WIDTH > RWDWIDTH ? waterfall('.main-content.waterfall', '.content') : false;
}

function waterfall(par, elem) {
    const RWDCONTENTWIDTH = 1000;
    const space = 20;

    let parents = document.querySelector(par);
    let child = document.querySelectorAll(elem, par);
    let childHeightArray = [];
    let colHeight = [0, 0];

    let parentsWidth = parents.offsetWidth;
    if (parentsWidth >= RWDCONTENTWIDTH) {
        childHeightArray = [...child].map(x => x.offsetHeight);
        colHeight[0] = childHeightArray[0] + space;
        colHeight[1] = childHeightArray[1] + space;

        for (let i = 2; i < child.length; i++) {
            const element = child[i];
            
        }





    }

    console.log('P', parents);
    console.log('C', child);
    console.log('W', childHeightArray);
}
