var key = 'rc4__uncompressed';
var data = {data: [{age: 1}, {age: '2'}]};
var rc4_u = new SecureLS({encodingType: 'rc4', isCompression: false});
ae = rc4_u.RC4.encrypt(JSON.stringify(data), 's3cr3t@123');
bde = rc4_u.RC4.decrypt(ae.toString(), 's3cr3t@123');
de = bde.toString(rc4_u.enc._Utf8);

rc4_u.setItem(key, data);
console.log('RC4 not Compressed');
console.log(localStorage.getItem(key));
console.log(rc4_u.getItem(key));
console.log('____________________________________')