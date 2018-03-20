import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import SecureSS from '../dist/secure-ss.js';

chai.expect();
chai.use(sinonChai);

const expect = chai.expect;
let lib;

describe('Standard SecureSS API Tests ->', () => {
  beforeEach(() => {
    sinon.spy(console, 'warn');
    lib = new SecureSS();
  });

  afterEach(() => {
    console.warn.restore();
    lib.removeAll();
  });

  describe('secure-ss: set method', () => {
    it('should warn if no key is provided', () => {
      expect(console.warn).to.not.be.called;
      lib.setItem();
      expect(console.warn).to.be.called;
    });

    it('should add key to list of stored keys', () => {
      let spy = sinon.spy(lib, 'processData');
      let lsSpy = sinon.spy(lib, 'setDataToSessionStorage');

      lib.setItem('test123');

      expect(lib.utils.allKeys).to.exist;
      expect(lib.utils.allKeys).to.be.an('array');
      expect(lib.utils.allKeys.length).to.equal(1);

      expect(spy).to.be.called;
      expect(lsSpy).to.be.called;
    });
  });

  describe('secure-ss: get method', () => {
    it('should warn if no key is provided', () => {
      expect(console.warn).to.not.be.called;
      lib.getItem();
      expect(console.warn).to.be.called;
    });

    it('should add key to list of stored keys', () => {
      let lsSpy = sinon.spy(lib, 'getDataFromSessionStorage');

      lib.getItem('test123');
      expect(lsSpy).to.be.called;
    });
  });

  describe('secure-ss: getAllKeys method', () => {
    it('should return [] if nothing set', () => {
      let keys = lib.getAllKeys();
      expect(keys).to.be.an('array');
      expect(keys.length).to.equal(0);
    });

    it('should return keys when there are', () => {
      let keys = lib.getAllKeys();
      expect(keys.length).to.equal(0);

      lib.setItem('key-1');

      keys = lib.getAllKeys();
      expect(keys).to.be.an('array');
      expect(keys.length).to.equal(1);

      lib.setItem('key-2');

      keys = lib.getAllKeys();
      expect(keys).to.be.an('array');
      expect(keys.length).to.equal(2);
    });
  });

  describe('secure-ss: remove method', function () {
    it('should warn if no key is provided', () => {
      expect(console.warn).to.not.be.called;
      lib.remove();
      expect(console.warn).to.be.called;
    });

    it('should warn if key is metakey and keys are there', () => {
      lib.setItem('key-1');
      lib.remove('_secure__ss__metadata');
      expect(console.warn).to.be.called;
      // clear
      lib.removeAll();
    });

    it('should not warn if key is metadata and no ther keys present', () => {
      lib.remove('_secure__ss__metadata');
      expect(console.warn).to.not.be.called;
    });

    it('should decreament counter', () => {
      lib.setItem('key-1', {});
      lib.setItem('key-2', []);
      expect(lib.utils.allKeys.length).to.equal(2);

      lib.remove();
      expect(console.warn).to.be.called;

      lib.remove('key-2');
      expect(lib.utils.allKeys.length).to.equal(1);

      // verify no effect on applying same operation i.e. removing already deleted key
      lib.remove('key-2');
      expect(lib.utils.allKeys.length).to.equal(1);

      lib.remove('key-1');
      expect(lib.utils.allKeys.length).to.equal(0);
    });

    it('should update the list of stored keys', () => {
    let spy = sinon.spy(lib, 'setMetaData');
    lib.setItem('key-1');
      lib.remove('key-1');
      expect(spy).to.be.called;
    });
  });

  describe('secure-ss: removeAll method', function () {
    it('verify allKeys length on removal', () => {
      let spy = sinon.spy(lib, 'getAllKeys');
      lib.setItem('key-1', {data: 'data'});
      lib.setItem('key-2', [1, 2, 3])

      expect(lib.utils.allKeys.length).to.equal(2);

      lib.removeAll();
      expect(spy).to.be.called;
      expect(lib.utils.allKeys.length).to.equal(0);
    });
  });

  describe('secure-ss: clear method', function () {
    it('verify allKeys length on removal', () => {
      lib.setItem('key-1', {data: 'data'});
      lib.setItem('key-2', [1, 2, 3])

      expect(lib.utils.allKeys.length).to.equal(2);

      lib.clear();
      expect(lib.utils.allKeys.length).to.equal(0);
    });
  });

});