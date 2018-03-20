var key = 'aes__compressed';
var data = {data: [{age: 1}, {age: '2'}]};
var aes_c = new SecureSS({encodingType: 'aes', encryptionSecret: ''});
ae = aes_c.AES.encrypt(JSON.stringify(data), '')
bde = aes_c.AES.decrypt(ae.toString(), '')
de = bde.toString(aes_c.enc._Utf8)

aes_c.setItem(key, data);
console.log('AES Compressed');
console.log(sessionStorage.getItem(key));
console.log(aes_c.getItem(key));
console.log('____________________________________')