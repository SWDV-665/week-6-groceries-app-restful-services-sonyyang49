import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { GroceriesServiceService } from '../../providers/groceries-service.service';
import { InputDialogService } from '../../providers/input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  //This is the title of the page.
  title = 'Grocery';
  errorMessage: string;
  items = [];

  constructor(
    public toastCtrl: ToastController,
    public dataService: GroceriesServiceService,
    public dataInput: InputDialogService,
    public socialSharing: SocialSharing
  ) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }

  ionViewDidLoad() {
    this.loadItems();
  }

  loadItems() {
    this.dataService
      .getItems()
      .subscribe(
        items => (this.items = items),
        error => (this.errorMessage = <any>error)
      );
  }

  //Removes the item with specified index from items array in the injectable service.
  async removeItem(item, index) {
    const toast = await this.toastCtrl.create({
      message: 'Item has been deleted.',
      duration: 2000
    });
    toast.present();

    this.dataService.removeItem(item);
  }

  //Updates the item with specified index from items array in the injectable service.
  async editItem(item, index) {
    const toast = await this.toastCtrl.create({
      message: 'Item ' + index + ' has been edited.',
      duration: 2000
    });
    toast.present();
    this.dataInput.showPrompt(item, index);
  }

  //Creates a new item at the end of the items array in the injectable service.
  addItem() {
    this.dataInput.showPrompt();
  }

  async shareItem(item) {
    const toast = await this.toastCtrl.create({
      message: 'Item  has been shared.',
      duration: 2000
    });
    toast.present();

    let message =
      'Grocery Item: ' + item.name + ' - Quantity: ' + item.quantity;
    let subject = 'Shared via Groceries app';
    this.socialSharing
      .share(message, subject)
      .then(() => {
        // Sharing via email is possible
        console.log('Shared successfully!');
      })
      .catch(error => {
        console.log('An error occurred: ', error);
      });
  }
}
