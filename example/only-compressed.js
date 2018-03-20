var key = 'only__compressed';
var data = {data: [{age: 1}, {age: '2'}]};
var o_c = new SecureSS({encodingType: ''});
ae = o_c.AES.encrypt(JSON.stringify(data), 's3cr3t@123');
bde = o_c.AES.decrypt(ae.toString(), 's3cr3t@123');
de = bde.toString(o_c.enc._Utf8);

o_c.setItem(key, data);
console.log('Only Compression, no encoding/encryption');
console.log(sessionStorage.getItem(key));
console.log(o_c.getItem(key));
console.log('____________________________________')