import Config from './ApiConfig';
import * as Storage from './AsyncStore'
import NavigationService from '../NavigationService';

const headers = { 
  "Content-type" : "application/x-www-form-urlencoded", 
  "Accept" : "application/json"
}

export class Api {
  
  getJSON(url) {
      return new Promise((resolve, reject) => {
      //  Storage.getData('token').then((token)=>{
         
        var fetchURL = function () {
            url = Config.serverURL + url;
        fetch(url, {
                headers: headers
            }).then(res => res.json())
              .catch(function (error) {
                reject(error);
            })
            .then(function (obj) {
                resolve(obj);
            })
            .done();
        }
        fetchURL();
  // })
})
  }
  deleteJSON(url, params = {}) {
    return new Promise((resolve, reject) => {
     Storage.getData('token').then((token)=>{

      const formBody = Object.keys(params).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&');

        var fetchURL = function () {
            url = Config.serverURL + url;
            
             fetch(url,{
                headers: token? {...headers1, 'Authorization':'Bearer '+ token } : headers1,
                method: 'DELETE',
                body: formBody
              })
              .then(res => res.json())
              .then(function (obj) {
              //alert(JSON.stringify(obj))
              resolve(obj);
                })
              .catch(function (error) {
              reject(error);
            })
            .done();
        }
        fetchURL();
    });
 });
}
  
postJSON(url, params = {}) {
  return new Promise((resolve, reject) => {
    Storage.getData('userId').then((user)=>{

      if(user) {
        params={
          ...params,
          userid: user
        }
      }
      var data = Object.keys(params).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&');

      var fetchURL = function () {
          url = Config.serverURL + url;
            fetch(url,{
              headers: headers,
              method: 'POST',
              body: data
          })
          .then(res => res.json())
          .then(function (obj) {
            //alert(JSON.stringify(obj))
            resolve(obj);
          })
          .catch(function (error) {
            reject(error);
          }).done();
        }
      fetchURL();
    });
  });
}
}