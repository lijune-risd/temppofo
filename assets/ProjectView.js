export class ProjectView {
    constructor() {
        this.bodyElem = document.createElement('div');
        this.bodyElem.classList.add('cover-panel');
        document.body.appendChild(this.bodyElem);

        this.bodyElem.addEventListener('click', e => {
            if (e.target.classList.contains('back-btn')) {
                // this.hide();
            }
        }

        );
        this.show();

    }

    show(data) {
       // this.bodyElem.style.backgroundColor = data.color;

        this.bodyElem.innerHTML = `
                    
        `;


        const timerId = setTimeout (() => {
            this.bodyElem.classList.add('active');
            clearTimeout(timerId);
            console.log(timerId);
        },100);

    }

    hide() {
        document.body.classList.remove('scroll-lock');
        this.bodyElem.classList.add('close');

        const timerId = setTimeout(() => {
            this.bodyElem.classList.remove('active', 'close');
            clearTimeout(timerId);
        }, 1000);
    }
}
