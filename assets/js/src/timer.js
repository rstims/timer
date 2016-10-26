import xtend from 'xtend';
import Base from './Base.js';
import Animations from './Animations.js';
import Cookies from './Cookies.js';

class Timer {
    
    constructor(options = {}) {
         
        this.options = xtend(Timer.options, options);

        this.transitionEnd = 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd, transitionEnd';

        this._setupElements();

        this.base = new Base();

        this.animations = new Animations(this.options, this.elements, this.base);
        this.cookies = new Cookies();

        this.elements.reset.addEventListener('click', e => {
            this.elements.showLoader();
            this.reset();
        }, false);

        this.init();
    }

    setClick(){
        this.elements.timer.addEventListener('click', this.fn, false);
    }

    setMessage(messageType){
        var txt;
        switch(messageType){
            case 'start':
                 txt = Timer.startText.replace('%%duration%%', this.options.duration);
                break;
            case 'end':
                 txt = Timer.endText.replace('%%duration%%', this.options.duration);
                break;
            default:
                txt = Timer.defaultText;
                break;
        }

        this.elements.message.innerHTML = txt;
    }

    init(fn = false){


        this.fn = (e) => {
            this.start();
        };

        this.setClick();

        
        this.base.addClass(this.elements.message, 'timer__message--start');

        if(this.options.inputControl){
            this.setMessage();
        }else{
            this.setMessage('start');
        }
        

        this.elements.message.style.display = 'block';

        this.elements.hideLoader();
    }

    start(){

        this.elements.timer.removeEventListener('click', this.fn);

        if(this.options.inputControl && this.options.inputControl == 0){
            alert('Value must be greater than 0');
            return;
        }

        this.options['duration'] = (this.options.inputControl) ? this.options.inputControl.value : this.options.duration;

        this.animations.run(this.options.duration, () => {
            this.end();
        });
    }

    end(){

        this.setMessage('end');
        this.elements.message.style.display = 'block';
        this.elements.reset.style.display = 'block';
        
    }

    reset(){
        console.log(1);
        this.elements.message.style.display = 'none';
        this.elements.reset.style.display = 'none';

        var fn = (e) => {
            
            this.base.removeClass(this.elements.message, 'timer__message--end');
            this.base.removeClass(this.elements.timer, 'timer--not-reset');
            this.base.addClass(this.elements.timer, 'timer--reset');
            this.init();
        };

        this.base.onetime(this.elements.progress, this.transitionEnd, fn);

        this.elements.progress.style.right = '100%';

        
    }

    _setupElements(){
        var timer = this.options.selector;
        console.log(timer);
        this.elements = {
            timer: timer,
            progress: timer.querySelector('.timer__progress'),
            reset: timer.querySelector('.timer__reset'),
            loader: timer.querySelector('.timer__loader'),
            message: timer.querySelector('.timer__message'),
            showLoader: function(){
                console.log('showLoader');
                this.loader.style.display = 'block';
            },
            hideLoader: function(){
                 console.log('hideLoader');
                this.loader.style.display = 'none';
            }
        }

        console.log(this.elements);

        if(this.options.readyBGColor !== ''){
            this.elements.timer.style.background = this.options.readyBGColor;
        }
        if(this.options.progressBGColor !== ''){
            this.elements.progress.style.background = this.options.progressBGColor;
        }
    }

}

//Will use str.replace() for display
Timer.startText = 'Click to begin a %%duration%%-minute timer';
Timer.endText = '%%duration%% minutes have passed';
Timer.defaultText = 'Please choose time';

// Overrideable options
Timer.options = {
    selector:document.querySelector('.timer'),
    duration: 10,
    readyBGColor:'',
    progressBGColor:'',
    endChime:'',
    inputControl:false
};
export default Timer;