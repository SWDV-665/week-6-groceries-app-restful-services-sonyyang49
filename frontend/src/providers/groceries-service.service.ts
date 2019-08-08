import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {
  //Creates an empty list of items.
  items: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = 'http://localhost:8080';

  constructor(public nativeAudio: NativeAudio, public http: HttpClient) {
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getItems(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/groceries').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response | any) {
    let body = res;
    console.log(body);
    return body || {};
  }

  //Adds the new input item to the end of the items array.
  addItem(item) {
    this.http.post(this.baseURL + '/api/groceries', item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  //Updates the item with specified index in the array.
  editItem(item) {
    this.http
      .put(this.baseURL + '/api/groceries/' + item._id, item)
      .subscribe(res => {
        this.items = res;
        this.dataChangeSubject.next(true);
      });
  }

  //Remove the item with specified index in the array.
  removeItem(item) {
    console.log('#### Remove Item - Id = ', item._id);
    this.http
      .delete(this.baseURL + '/api/groceries/' + item._id)
      .subscribe(res => {
        this.items = res;
        this.dataChangeSubject.next(true);
      });
    this.deleteAudio();
  }

  deleteAudio() {
    this.nativeAudio.preloadSimple('uniqueId2', '../../assets/delete.mp3').then(
      function(msg) {
        console.log(msg);
      },
      function(error) {
        console.log(error);
      }
    );
    this.nativeAudio.play('uniqueId2').then(
      function(msg) {
        console.log(msg);
      },
      function(error) {
        console.log(error);
      }
    );
  }
}
