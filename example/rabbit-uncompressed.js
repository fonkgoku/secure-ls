var key = 'rabbit__uncompressed';
var data = {data: [{age: 1}, {age: '2'}]};
var rabbit_u = new SecureSS({encodingType: 'rabbit', isCompression: false});
ae = rabbit_u.RABBIT.encrypt(JSON.stringify(data), 's3cr3t@123');
bde = rabbit_u.RABBIT.decrypt(ae.toString(), 's3cr3t@123');
de = bde.toString(rabbit_u.enc._Utf8);

rabbit_u.setItem(key, data);
console.log('RABBIT not Compressed');
console.log(sessionStorage.getItem(key));
console.log(rabbit_u.getItem(key));
console.log('____________________________________')