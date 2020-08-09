// eslint-disable-next-line no-extend-native
Function.prototype.my_bind = function(context){
    if(typeof this !== "function"){
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var self = this;
    var arg = Array.prototype.slice.call(arguments, 1);
    var F = function(){};
    F.prototype = this.prototype;
    var bound = function(){
        var innerArg = Array.prototype.slice.call(arguments);
        var finalArg = arg.concat(innerArg);
        return self.apply(this instanceof F ? this : context || this, finalArg );
    }
    bound.prototype = new F();
    return bound;
}
function a(){
    return this.name;
}
a();     //''

var b = {name: 'kong'};
a.bind(b)()   //kong

a.my_bind(b)()  //kong
console.log(a.my_bind(b)(), a.bind(b)())



