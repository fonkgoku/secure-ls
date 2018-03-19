var key = 'base64__compressed';
var data = {data: [{age: 1}, {age: '2'}]};
var b_c = new SecureLS();
ae = b_c.AES.encrypt(JSON.stringify(data), 's3cr3t@123');
bde = b_c.AES.decrypt(ae.toString(), 's3cr3t@123');
de = bde.toString(b_c.enc._Utf8);

b_c.setItem(key, data);
console.log('Base64 Compressed');
console.log(localStorage.getItem(key));
console.log(b_c.getItem(key));
console.log('____________________________________')