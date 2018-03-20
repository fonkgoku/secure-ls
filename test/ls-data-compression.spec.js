import chai from 'chai';
import SecureSS from '../dist/secure-ss.js';
import mockLS from './mock/ls';

const expect = chai.expect;

chai.expect();

describe('Data Compression Tests ->', () => {
  let mockStorage = mockLS.storageMock();
  let lib;

  beforeEach(() => {
    mockLS.storage = {};
    lib = new SecureSS();
    lib.ss = mockStorage;
  });

  afterEach(() => {
    lib.removeAll();
  });

  describe('no data compression but Base64 encoded', () => {
    it('should not compress data before storing to localStorage', () => {
      let valueStored;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureSS({isCompression: false});
      lib.ss = mockStorage;
      lib.setItem(key, data);

      // corresponding to [1, 2, 3] => WzEsMiwzXQ== i.e. Base64 encoded
      valueStored = lib.LZString.compress(lib.Base64.encode(JSON.stringify(data)));

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');
      // important
      expect(mockLS.storage[key]).to.not.equal(valueStored);

      lib.removeAll();
    });
  });

  describe('no data compression and no encoding', () => {
    it('should not compress data before storing to localStorage', () => {
      let valueStored;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib = new SecureSS({encodingType: '', isCompression: false});
      lib.ss = mockStorage;
      lib.setItem(key, data);

      // corresponding to [1, 2, 3] => "[1, 2, 3]"
      valueStored = JSON.stringify(data);

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');
      // important
      expect(mockLS.storage[key]).to.equal(valueStored);

      lib.removeAll();
    });
  });

  describe('data compression', () => {
    it('should compress data before storing to localStorage', () => {
      let valueStored;
      let data = [1, 2, 3];
      let key = 'key-1';

      lib.setItem(key, data);

      // corresponding to [1, 2, 3] => 㪂ೠ눉惮 脔ொꀀ
      valueStored = lib.LZString.compress(lib.Base64.encode(JSON.stringify(data)));

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');
      // important
      expect(mockLS.storage[key]).to.equal(valueStored);
    });

    it('should compress data before storing to localStorage', () => {
      let valueStored;
      let data = {
        username: 'softvar',
        contact: 1234567890,
        hobbies: ['x', 'y', 'z']
      };
      let key = 'key-1';

      lib.setItem(key, data);

      // corresponding to [1, 2, 3] => ⦄ࣀ옄쁪‑腬ؠᜁ栙䂒ͥ쀻äʹ좀鑠ፀ൜Ұـ愰ʴ䘁堀斠ᵄ뽜鰃�ଠ՚䰀ι〈怜䀧ፚ저�舀郰Y馮ހ㎱्蠀
      valueStored = lib.LZString.compress(lib.Base64.encode(JSON.stringify(data)));

      expect(mockLS.storage[key]).to.exist;
      expect(mockLS.storage[key]).to.be.a('string');
      // important
      expect(mockLS.storage[key]).to.equal(valueStored);
    });
  });

});
