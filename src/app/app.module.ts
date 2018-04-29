import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Natives components 
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera  } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';

import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { FieldPage } from '../pages/field/field';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { ProfilePage } from '../pages/profile/profile';
import { ProjectPage } from '../pages/project/project';
import { QAndRPage } from '../pages/q-and-r/q-and-r';
import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { WeaterPage } from '../pages/weater/weater';
import { PricePage } from '../pages/price/price';
import { SettingPage } from '../pages/setting/setting';
import { AboutPage } from '../pages/about/about';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { QuestionSinglePage } from '../pages/question-single/question-single';
import { ArticleServiceProvider } from '../provider/news.service';
import { QuestionServiceProvider } from '../provider/questions.service';
import { AddQuestionPage } from '../pages/add-question/add-question';
import { WeatherServiceProvider } from '../provider/weather.service';
import { ProfileServiceProvider } from '../provider/profile.service';
import { AnswerServiceProvider } from '../provider/answer.service';
import { IonicStorageModule } from '@ionic/storage';
import { AuthServiceProvider } from '../provider/auth.service';
import { ProjectStartPage } from '../pages/project-start/project-start';
import { ProjectServiceProvider } from '../provider/project.service';
import { RegisterPage } from '../pages/register/register';
import { SortGridPipe } from '../provider/sortgrid.provider';
import { NotificationPage } from '../pages/notification/notification';
import { EditProfilePage } from '../pages/profile-edit/profile-edit';



@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    FieldPage,
    LoginPage,
    RegisterPage,
    MenuPage,
    ProfilePage,
    EditProfilePage,
    ProjectPage,
    QAndRPage,
    HomePage,
    NewsPage,
    WeaterPage,
    PricePage,
    SettingPage,
    AboutPage,
    QuestionSinglePage,
    AddQuestionPage,
    ProjectStartPage,
    NotificationPage,

    // Sort
    SortGridPipe

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp, {tabsHideOnSubPages:"true"}),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    FieldPage,
    LoginPage,
    RegisterPage,
    MenuPage,
    ProfilePage,
    EditProfilePage,
    ProjectPage,
    ProjectStartPage,
    QAndRPage,
    HomePage,
    NewsPage,
    WeaterPage,
    PricePage,
    SettingPage,
    AboutPage,
    QuestionSinglePage,
    AddQuestionPage,
    NotificationPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativePageTransitions,
    AnswerServiceProvider,
    ArticleServiceProvider,
    ProfileServiceProvider,
    QuestionServiceProvider,
    ProjectServiceProvider,
    AuthServiceProvider,
    WeatherServiceProvider,
    Camera,
    FileTransfer,
    File,
    FileTransferObject,
    Crop,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
