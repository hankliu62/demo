function ObserverList(){
   this.observerList = [];
}
ObserverList.prototype.Add = function(obj){
   return this.observerList.push(obj);
};
ObserverList.prototype.Remove = function(obj){
   return this.observerList.pop(obj);
};
ObserverList.prototype.Empty = function(){
   this.observerList = [];
};
ObserverList.prototype.Count = function(){
   return this.observerList.length;
};
ObserverList.prototype.Get = function(index){
   if(index > -1 && index < this.observerList.length){
      return this.observerList[index];
   }
};
ObserverList.prototype.Insert = function(obj,index){
   var pointer = -1;
   if(index === 0){
      this.observerList.unshift(obj);
      pointer = index;
   }else if(index === this.observerList.length){
      this.observerList.push(obj);
      pointer = index;
   }
   return pointer;
};
ObserverList.prototype.IndexOf = function(obj,startIndex){
   var i = startIndex,
       pointer = -1;
   while(i < this.observerList.length){
       if(this.observerList[i] === obj){
          pointer = i;
       }
       i++;
   }
   return pointer;
};
ObserverList.prototype.RemoveIndexAt = function(index){
   if(index === 0){
     this.observerList.shift();
   }else if(index === this.observerList.length - 1){
     this.observerList.pop();
   }
};
//使用extension扩展对象
function extend(obj, extension){
   for(var key in obj){
      extension[key] = obj[key];
   }
};
var liuyidi = {};
var observer = new ObserverList();
extend(observer,liuyidi);
console.log(liuyidi);