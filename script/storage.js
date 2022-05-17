'use strict';

//Save localStorage func
function saveToStorage (Key, Value){
    localStorage.setItem(Key, JSON.stringify(Value));
}

//Get data from localStorage
function getFromStorage(Key){
    const Obj = JSON.parse(localStorage.getItem(Key));
    return Obj;
}

