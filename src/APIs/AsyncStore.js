import AsyncStorage from '@react-native-community/async-storage';

export async function saveData(key, value){
    await AsyncStorage.setItem(key, value);
 }

export async function getData(key){
    
    let val=''
    val =  await AsyncStorage.getItem(key);

    try{
        if(val != null|| val!=''){
            return val
        }else{
            return false
        }}catch(error){
            console.log('error')
        }
 }

 export async function removeData(key) {
        try {
        await AsyncStorage.removeItem(key);
        return true;
        }
        catch(exception) {
        return false;
        }
  }