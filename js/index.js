const RWDWIDTH = 1200;
let WIDTH = window.innerWidth;

let wf, gm;

window.onresize = () => {
    WIDTH = window.innerWidth;
    wf.reset();
}

window.onload = () => {
    wf = new waterfall('.maincontent.waterfall', '.content');
    wf.reset();
    gm = new gallerymodal('.modal.gallerymodal', '.content.gallery .album');
    gm.init();
}

function waterfall(par, elem) {
    this.RWDCONTENTWIDTH = 1000;
    this.SPACE = 20;

    this.parents = document.querySelector(par);
    this.child = this.parents.querySelectorAll(elem);
    this.childHeightArray = [];
    this.colHeight = [0, 0];

    this.reset = function () {
        if (WIDTH >= RWDWIDTH && this.parents.offsetWidth >= this.RWDCONTENTWIDTH) {
            this.childHeightArray = [...this.child].map(x => x.offsetHeight);
            this.colHeight = [this.childHeightArray[0] + this.SPACE, 0];
            
            for (let i = 1; i < this.child.length; i++) {
                let dom = this.child[i];
                let minColHeight = Math.min(...this.colHeight);
                let minColIdx = this.colHeight.indexOf(minColHeight);
                dom.style.transform = 'translate(' + (490 + this.SPACE) * minColIdx + 'px, ' + minColHeight + 'px)';
                this.colHeight[minColIdx] += this.childHeightArray[i] + this.SPACE;
            }
            this.parents.style.height = Math.max(...this.colHeight) + 'px';
        } else {
            [...this.child].map(c => c.style.transform = '');
            this.parents.style.height = '';
        }
    }

}

function gallerymodal(modal, gallery) {
    this.body = document.body;
    this.modal = document.querySelector(modal);
    this.galleryimage = document.querySelector(gallery).querySelectorAll('img');
    this.idx = 0;

    this.init = function () {
        this.modal.querySelector('.modalclose').addEventListener('click', () => {
            this.hide();
        });
        this.modal.querySelector('.modallast').addEventListener('click', () => {
            [...this.modal.querySelector('.modallast').classList].indexOf('disable') == -1 ? this.show(this.idx - 1) : false;
        });
        this.modal.querySelector('.modalnext').addEventListener('click', () => {
            [...this.modal.querySelector('.modalnext').classList].indexOf('disable') == -1 ? this.show(this.idx + 1) : false;
        });
        [...this.galleryimage].map((img, idx) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                this.show(idx);
            });
        });
    }

    this.show = function (idx) {
        this.idx = idx;
        this.body.style.overflow = 'hidden';

        this.modal.querySelector('.modalbody .modalimage img').src = this.galleryimage[this.idx].src;

        this.modal.querySelector('.modallast').classList.remove('disable');
        this.modal.querySelector('.modalnext').classList.remove('disable');
        if (this.idx == 0) {
            this.modal.querySelector('.modallast').classList.add('disable');
        } else if (this.idx == this.galleryimage.length - 1) {
            this.modal.querySelector('.modalnext').classList.add('disable');
        }

        this.modal.classList.add('show');
        setTimeout(() => {
            this.modal.classList.add('active');
        }, 100);
    }
    this.hide = function () {
        this.modal.classList.remove('active');
        setTimeout(() => {
            this.modal.classList.remove('show');
        }, 300);
        this.body.style.overflow = '';
    }
}


