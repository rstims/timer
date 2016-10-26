import Sound from './Sound';


class Animations {
    
    constructor(options, elements, base) {

        this.sound = new Sound();

        this.options = options;
        this.elements = elements;
        this.base = base;
        this.init();

        this.sound.init(this.options.endChime, 100, false, false);
        this.transitionSeconds = 1000;
        
    }

    init(){
         this.count = 100;
         //this.sound.remove();
    }

    run(duration = 0, callback = {}){
        console.log("Started timer...");
        this.callback = callback;
        this.durationSeconds = duration * 60;
        
        this.base.removeClass(this.elements.message, 'timer__message--start');

        this.base.removeClass(this.elements.timer, 'timer--stopped timer--reset');
        this.base.addClass(this.elements.timer, 'timer--running');

        this.base.addClass(this.elements.progress, 'timer__progress--running');

        this.elements.message.style.display = 'none';

        this.count = this.increment = 100 / this.durationSeconds;

        this.setVendor(this.elements.progress, 'TransitionDuration', (this.transitionSeconds / 1000) + 's' );
        console.log(this.elements.progress.style);
        this.runInterval = setInterval(() => {
            this.step();
        }, 1000);
        return;
    }

    step(){
        console.log(this.count);
        this.elements.progress.style.right = (100 - this.count) + '%';

        if(100 == parseInt(this.count)){

            setTimeout(() => {
                this.sound.start();
                this.stop();
                return;
            }, this.transitionSeconds);
            
        }

        this.count += this.increment;
        if(this.count > 100){
            this.count = 100;
        }
        return;
    }

    stop(){
        
        this.count = 0;
        clearInterval(this.runInterval);

        this.base.addClass(this.elements.message, 'timer__message--end');
        
        this.base.removeClass(this.elements.timer, 'timer--running');
        this.base.removeClass(this.elements.progress, 'timer__progress--running');
        this.base.addClass(this.elements.timer, 'timer--stopped timer--not-reset');

        
        console.log("Stopped timer...");
        this.init();
        this.callback();
        return;
    }

    setVendor(element, property, value) {
      element.style["webkit" + property] = value;
      element.style["moz" + property] = value;
      element.style["ms" + property] = value;
      element.style["o" + property] = value;
      return;
    }

    
}

export default Animations;