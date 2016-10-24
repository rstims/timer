class Base{
	
	constructor(){
		
	}

	removeClass(el, cls){
        var classes = cls.split(' ');

        for(var i = 0; i<classes.length; i++) {
            el.classList.remove(classes[i]);
        }
    }
    
    addClass(el, cls){
        var classes = cls.split(' ');

        for(var i = 0; i<classes.length; i++) {
            el.classList.add(classes[i]);
        }
    }

    toggleClass(el, cls){
        var classes = cls.split(' ');

        for(var i = 0; i<classes.length; i++) {
            el.classList.toggle(classes[i]);
        }
    }

    hasClass(el, cls){

        var classes = cls.split(' ');

        for(var i = 0; i<classes.length; i++) {
            if(!el.classList.contains(classes[i])){
                return false;
            }
        }

        return true;
    }

  
    onetime(node, type, callback){
        var types = type.split(' '),
        fn = function(e){
            for (var p = 0; p < types.length; p++) {
                e.target.removeEventListener(types[p], fn);
            }
            return callback(e);
        };

        for (var p = 0; p < types.length; p++) {
            node.addEventListener(types[p], fn, false);
        }
	}


	fireEvent(node, eventName) {
         var event = new CustomEvent(eventName);
            // The second parameter says go ahead with the default action
            node.dispatchEvent(event, true);
    };
}

export default Base;