import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  title= "Grocery List";
  //Empty grocery list.
  items = [];
  errorMessage: string;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing) {
    
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }
  //load the default list.
  ionViewDidEnter() {
    this.loadItems();
  }

  //update or load the new list.
  loadItems(){
    this.dataService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error
        );
  }

  //removes the item
  removeItem(item, index){
    const toast = this.toastCtrl.create({
      message: 'Removing Item number '+ index,
      duration: 3000 }
    );
    toast.present();
    
    this.dataService.removeItem(item);
  }

  //share the item via native device.
  shareItem(item, index){
    const toast = this.toastCtrl.create({
      message: 'Sharing Item number '+ index,
      duration: 3000 }
    );
    toast.present();

    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Share via Groceries app";
    this.socialSharing.share(message, subject).then(() => {

    }).catch((error) => {
      console.error("Error while Sharing: ", error);
    });

  }

  //Edits and item
  editItem(item, index){
    const toast = this.toastCtrl.create({
      message: 'Editing Item number '+ index,
      duration: 2000 }
    );
    toast.present();
    this.inputDialogService.showPromt(item, index)
  }

  //Adds a new item.
  addItem(){
   this.inputDialogService.showPromt();
  }
  

}
