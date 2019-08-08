import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from './groceries-service.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {
  constructor(
    public alertCtrl: AlertController,
    public groceryService: GroceriesServiceService,
    public nativeAudio: NativeAudio
  ) {}

  //Creates a prompt that will show edit item or add item based on the default parameter that is passed through.
  //will show a blank form if add is selected.
  //will show a prefilled item that can be editted.
  async showPrompt(item?, index?) {
    if (index !== undefined) {
      var id = item._id;
    }

    const prompt = await this.alertCtrl.create({
      header: item ? 'Edit Item' : 'Add Item',
      message: item
        ? 'Please edit item...'
        : 'Please enter item information...',
      inputs: [
        {
          name: 'name',
          placeholder: 'Item Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Item Quantity',
          value: item ? item.quantity : null
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Item Canceled');
          }
        },
        {
          text: item ? 'Save' : 'Add',
          handler: item => {
            console.log('Item added', item);

            //Will update if exists.  Will add if not exist.
            if (index !== undefined) {
              this.groceryService.editItem(item);
            } else {
              this.groceryService.addItem(item);
            }

            this.addAudio();
          }
        }
      ]
    });
    prompt.present();
  }

  addAudio() {
    this.nativeAudio.preloadSimple('uniqueId1', '../../assets/add.mp3').then(
      function(msg) {
        console.log(msg);
      },
      function(error) {
        console.log(error);
      }
    );
    this.nativeAudio.play('uniqueId1').then(
      function(msg) {
        console.log(msg);
      },
      function(error) {
        console.log(error);
      }
    );
  }
}
