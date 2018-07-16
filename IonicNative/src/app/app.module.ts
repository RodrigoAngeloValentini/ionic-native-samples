import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Transfer } from '@ionic-native/transfer';

import { BarcodeScannerPage } from './../pages/barcode-scanner/barcode-scanner';
import { CameraPage } from './../pages/camera/camera';
import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    BarcodeScannerPage,
    CameraPage,
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    BarcodeScannerPage,
    CameraPage,
    MyApp,
    HomePage
  ],
  providers: [
    BarcodeScanner,
    Camera,
    File,
    FilePath,
    StatusBar,
    SplashScreen,
    Transfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
