class Sound{
    
    constructor(){
        var son;
        this.son=son;
        this.finish=false;
    }

    stop(){
        //document.body.removeChild(this.son);
        this.son.pause();
        this.son.currentTime = 0
    }

    start(){
        this.son.play();
        
        setTimeout(() => {this.stop();}, this.son.duration * 1000);
    }

    remove(){

        if(this.son == null){
            return false;
        }
        
        document.body.removeChild(this.son);
        this.finish=true;
    }

    init(source = "",volume = 100,loop = true, autoplay = true){
        this.finish=false;
        this.volume=volume;
        this.loop=loop;


        if(source === ""){
            return;
        }

        this.source=source;
        this.volume=volume;
        this.loop=loop;

        if(this.finish)return false;
        this.son=document.createElement("audio");
        this.son.setAttribute("src",this.source);
        this.son.setAttribute("style","visibility:hidden;height:0;");
        this.son.setAttribute("volume",this.volume);
        this.son.setAttribute("autostart",autoplay);
        this.son.setAttribute("loop",this.loop);
        document.body.appendChild(this.son);
    }
}

export default Sound;