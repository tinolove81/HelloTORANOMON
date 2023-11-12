const RWDWIDTH = 1200;
let WIDTH = window.innerWidth;

let wf;

window.onresize = () => {
    WIDTH = window.innerWidth;
    wf.reset();
}

window.onload = () => {
    wf = new waterfall('.maincontent.waterfall', '.content');
    wf.reset();
}

function waterfall(par, elem) {
    this.RWDCONTENTWIDTH = 1000;
    this.space = 20;

    this.parents = document.querySelector(par);
    this.child = document.querySelectorAll(elem, par);
    this.childHeightArray = [];
    this.colHeight = [0, 0];

    console.log('P', this.parents);
    console.log('C', this.child);
    console.log('W', this.childHeightArray);

    this.reset = function () {
        if (WIDTH >= RWDWIDTH && this.parents.offsetWidth >= this.RWDCONTENTWIDTH) {
            this.childHeightArray = [...this.child].map(x => x.offsetHeight);
            this.colHeight = [this.childHeightArray[0] + this.space, 0];
            
            for (let i = 1; i < this.child.length; i++) {
                let dom = this.child[i];
                let minColHeight = Math.min(...this.colHeight);
                let minColIdx = this.colHeight.indexOf(minColHeight);
                dom.style.transform = 'translate(' + (490 + this.space) * minColIdx + 'px, ' + minColHeight + 'px)';
                this.colHeight[minColIdx] += this.childHeightArray[i] + this.space;
            }
            this.parents.style.height = Math.max(...this.colHeight) + 'px';
        } else {
            [...this.child].map(c => c.style.transform = '');
            this.parents.style.height = '';
        }
    }

}
