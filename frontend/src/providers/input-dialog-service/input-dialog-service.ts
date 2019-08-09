import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';


@Injectable()
export class InputDialogServiceProvider {

  constructor(public alertCtrl: AlertController, public dataService: GroceriesServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  //Prompts to add item or edit item.  
  showPromt(item?, index?) {

    const promt = this.alertCtrl.create({
      
      title: item ? 'Edit item' : 'Add Item',
      
      message: item ? 'Enter item details then click add' : 'Change item details then click save',
      
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item ? item.quantity : null
        },
      ],
      
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: item ? 'Add' : 'Save',
          handler: data => {
            if (index != undefined) {
              item.name = data.name;
              item.quantity = data.quantity;
              this.dataService.editItem(item, index);
            }
            else {
              this.dataService.addItem(data);
            }
          }
        }
      ]

    });
    promt.present();
  }

}
