import {LitElement, html, css} from 'lit-element';

class JelementMenu extends LitElement {
    static get properties() {
        return {
            options: {type: String},
            optionsArray: {type: Array},
            optionsHREF : {type: String},
            optionsHREFArray : {type: String},
            background: {type: String},
            stateLoad: {type: Boolean}
        }
    }

    constructor() {
        super();
        this.stateLoad = false;
        this.background = "#333";
    }

    firstUpdated() {
        this.optionsArray = this.options.split(",");
        this.optionsHREFArray = this.optionsHREF.split(",");
        this.stateLoad = true;
    }

    render() {
        return html`
            <nav class="menu" style="background-color: ${this.background}">
                <button class="btnAction" @click="${this.actionMenu}" action="open" style="background-color: ${this.background}">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="options">
                    ${this.stateLoad ? 
                        this.optionsArray.map((item, index) =>
                        html`<li><a href="${this.optionsHREFArray[index]}" @click="${this.actionMenu}" action="close">${item}</a></li>`):
                        ""
                    }
                </ul>
            </nav>
        `;
    }

    actionMenu(){
        const menu = this.shadowRoot.querySelector(".menu");
        const btnAction = this.shadowRoot.querySelector(".btnAction");
        const action = btnAction.getAttribute("action");
        const options = this.shadowRoot.querySelectorAll("a");
        try{
            if(action == "open"){
                btnAction.disabled = true;
                btnAction.classList.add("active");
                btnAction.setAttribute("action","close");
                menu.classList.add("active");
                setTimeout(() => {
                    this.actionsOptions(options, 0, "show");
                }, 800);
            }else{
                btnAction.disabled = true;
                this.actionsOptions(options, options.length-1, "close");
                setTimeout(() => {
                    btnAction.classList.remove("active");
                    btnAction.setAttribute("action","open");
                    menu.classList.remove("active");
                }, 500);
            }
        }catch(e){
            console.log(e)
        }finally{
            setTimeout(() => {
                btnAction.disabled = false;
            }, 1500);
        }
    }

    actionsOptions(options, count, action){
        if(action == "show"){
            if(count < options.length){
                options[count].classList.add("active");
                setTimeout(() => {
                    this.actionsOptions(options, count+1, "show");
                }, 100);
            }
        }else{
            if(count >= 0){
                options[count].classList.remove("active");
                setTimeout(() => {
                    this.actionsOptions(options, count-1, "close");
                }, 100);
            }
        }
    }

    static get styles() {
        return [css`
        *{
            padding: 0;
            margin: 0;
            outline: 0;
            border: none;
            box-sizing: border-box;
            text-decoration: none;
            list-style: none;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        .menu{
            width: 70px;
            height: 70px;
            position: fixed;
            top: 0;
            right: 0;
            z-index: 99;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
                -ms-flex-pack: center;
                    justify-content: center;
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            -webkit-transition: width .5s, height .5s .5s;
            transition: width .5s, height .5s .5s;
            overflow: hidden;
        }
        .menu:hover{
            width: 80px;
        }
        .menu.active{
            width: 100%;
            height: 100vh;
        }
        .btnAction{
            width: 70px;
            height: 70px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
                -ms-flex-direction: column;
                    flex-direction: column;
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            -webkit-box-pack: center;
                -ms-flex-pack: center;
                    justify-content: center;
            position: absolute;
            top: 0;
            right: 0;
            background-color: transparent;
            color: #ddd;
            cursor: pointer;
            z-index: 99;
        }
        .btnAction span{
            width: 40px;
            height: 3px;
            margin: 4px;
            background-color: #ddd; 
            -webkit-transition: margin .5s .5s, opacity .2s, -webkit-transform .5s .0s; 
            transition: margin .5s .5s, opacity .2s, -webkit-transform .5s .0s; 
            transition: margin .5s .5s, opacity .2s, transform .5s .0s; 
            transition: margin .5s .5s, opacity .2s, transform .5s .0s, -webkit-transform .5s .0s;
        }
        .btnAction.active span:first-child{
            margin-bottom: -8px;
            -webkit-transform: rotate(40deg);
                    transform: rotate(40deg);
            -webkit-transition: margin .5s .0s, opacity .2s, -webkit-transform .5s .5s;
            transition: margin .5s .0s, opacity .2s, -webkit-transform .5s .5s;
            transition: margin .5s .0s, opacity .2s, transform .5s .5s;
            transition: margin .5s .0s, opacity .2s, transform .5s .5s, -webkit-transform .5s .5s;
        }
        .btnAction.active span:nth-child(2){
            opacity: 0;
        }
        .btnAction.active span:last-child{
            margin-top: -6px;
            -webkit-transform: rotate(-40deg);
                    transform: rotate(-40deg);
            -webkit-transition: margin .5s .0s, opacity .2s, -webkit-transform .5s .5s;
            transition: margin .5s .0s, opacity .2s, -webkit-transform .5s .5s;
            transition: margin .5s .0s, opacity .2s, transform .5s .5s;
            transition: margin .5s .0s, opacity .2s, transform .5s .5s, -webkit-transform .5s .5s;
        }
        .options{
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
                -ms-flex-direction: column;
                    flex-direction: column;
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            position: relative;
            z-index: 90;
        }
        .options li a{
            color: #ddd;
            font-size: 2em;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            border-bottom: 2px solid transparent;
            -webkit-transition: border .3s, opacity .4s;
            transition: border .3s, opacity .4s;
            opacity: 0;
        }
        .options li a.active{
            opacity: 1;
            -webkit-transition: border .3s, opacity 1s;
            transition: border .3s, opacity 1s;
        }
        .options li a:hover{
            border-bottom: 2px solid #ddd;
        }
        .options li{
            margin: .3em;
        }
        `];
    }

}

customElements.define('jelement-menu', JelementMenu);