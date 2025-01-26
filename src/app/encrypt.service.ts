import { Injectable } from "@angular/core";
import * as CryptoTS from 'crypto-ts';

@Injectable({
  providedIn: "root"
})
export class EncryptionService {
  // key: string = "z!!!!!!!1sdfadsf56adf456asdfasdf";
  // appProperties = {
  //   VALUES: {
  //     KEY: "MTIzNDU2Nzg5MEFCQ0RFRkdISUpLTE1O",
  //     IV: "MTIzNDU2Nzg="
  //   }
  // }

  constructor() {}

  encryptionAES (msg:any) {
    // Encrypt
    const ciphertext = CryptoTS.AES.encrypt(msg, 'HgetA@541))91=-haw');
    return ciphertext.toString();
  }

  decryptionAES (msg:any) {
    // Decrypt
    const bytes  = CryptoTS.AES.decrypt(msg, 'HgetA@541))91=-haw');
    const plaintext = bytes.toString(CryptoTS.enc.Utf8);
    return plaintext;
  }
}