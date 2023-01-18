import { appDir } from '@tauri-apps/api/path';
import { pki } from 'node-forge';
import { invoke } from '@tauri-apps/api/tauri'

const privFile = 'priv.key';
const pubFile = 'pub.key';

let privateKey = '';
let publicKey = '';

let rsa = pki.rsa;


export function generateRSA(successCbk, errorCbk){
    //TODO need to add passphrase
    rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, keypair) {
        if(err){
            errorCbk(err);
            
        }else{
            successCbk(keypair.privateKey, keypair.publicKey);
        }
        
    });

}

export function encryptText(text){
    let encodedData = window.btoa(text);
    let encBytes = publicKey.encrypt(encodedData);
    return window.btoa(encBytes);
}

export function decryptText(text){
    let decText = privateKey.decrypt(window.atob(text));
    return window.atob(decText);
     
}

export function loadKeys(){
    appDir().then(basePath=>{
        let privpath = basePath+privFile;
        let publicPath = basePath+pubFile;
        invoke("read_file", { path: privpath }).then((content) => {
            if(content=='Error opening file'){
                createKeyAndSave(basePath);
            }else{
                privateKey = pki.privateKeyFromPem(content);
                console.log('pri key', privateKey);
                loadPubKey(publicPath);
            }
          });
        }
    );
}

function loadPubKey(publicPath){
    invoke("read_file", { path: publicPath }).then((content) => {
        if(content=='Error opening file'){
            console.log('Eroor opening public key');
        }else{
            publicKey = pki.publicKeyFromPem(content);
            console.log('pub key', publicKey);
        }
      });
}

function createKeyAndSave(basePath){
    generateRSA((privKey, pubKey)=>{
        privateKey = privKey;
        publicKey = pubKey;
        console.log('key', privKey);
        let privPem = pki.privateKeyToPem(privateKey);
        let pubPem = pki.publicKeyToPem(publicKey);
        invoke("save_file", {
            path: basePath+privFile,
            content: privPem
        }).then();
        invoke("save_file", {
            path: basePath+pubFile,
            content: pubPem
        }).then();
    })
}