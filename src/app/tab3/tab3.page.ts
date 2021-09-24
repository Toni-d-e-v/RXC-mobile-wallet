import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { PuppipayDashService  } from '../providers/puppipay.dash.service';

declare var bitcoin;
declare var dashcore;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

walletwif : any;
walletaddress : any;
testnetaddressbalance : any;
url: string;

constructor(public http: Http, 
         private puppipayservice: PuppipayDashService,
	public storage: Storage) {

    this.loadwalletwif() ;

}

ionViewWillEnter() {
  this.loadwalletwif() ;
}

createwif1() {

}
createwif() {
  const RXC = bitcoin.networks.bitcoin;
  RXC.pubKeyHash = 0x3c; RXC.wif = 0xBC; RXC.scriptHash = 0x3d;
  const keyPair = bitcoin.ECPair.makeRandom();
  const pubKey = keyPair.getAddress();
  const privKey = keyPair.toWIF();
  this.walletwif = privKey;
  this.walletaddress = pubKey;
  this.storage.set('walletwif', this.walletwif);
  //this.storage.set('walletaddress', this.walletaddress);

}



savewif() {

   this.storage.set('walletwif', this.walletwif);
   const RXC = bitcoin;
   RXC.pubKeyHash = 0x3c; RXC.wif = 0xBC; RXC.scriptHash = 0x3d;
   var keyPair = RXC.ECPair.fromWIF(this.walletwif);
   var BTCAddressFromWIF = keyPair.getAddress(keyPair, keyPair.network);
   console.log(BTCAddressFromWIF);
   alert("Wallet impoted!! ");
   this.storage.set('walletaddress', BTCAddressFromWIF);


}

wiftoaddress() {
  const RXC = bitcoin;
  RXC.pubKeyHash = 0x3c; RXC.wif = 0xBC; RXC.scriptHash = 0x3d;
  var keyPair = RXC.ECPair.fromWIF(this.walletwif);
  var BTCAddressFromWIF = keyPair.getAddress(keyPair, keyPair.network);
  console.log(BTCAddressFromWIF);
  this.storage.set('walletaddress', BTCAddressFromWIF);
  alert("Wallet impoted!! " + BTCAddressFromWIF);

 
}
loadwalletwif() {
     this.storage.get('walletwif').then(data=> {
	if(data) {
      this.walletwif = data;
      this.gettestnetbalance() ;
        }
     });
}





gettestnetbalance() {

if(!this.walletaddress) {
 return;
}

 this.puppipayservice.getBalance(this.walletaddress, "testnet").then((data: any) => {
      if(data != null)
      {
        this.testnetaddressbalance = data;
      }
      else {
        alert("Query failed");
      }
   }, (err)=> {
     alert (err)
   });
}


}
