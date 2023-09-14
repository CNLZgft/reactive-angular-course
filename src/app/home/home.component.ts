import { Component, OnInit } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { CoursesService } from "../services/courses.service";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";
import { CourseStore } from "../services/courses.store";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
    private loadingService: LoadingService,
    private messagesService: MessagesService,
    private courseStore: CourseStore
  ) {}

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    //para mostar el icono de carga se puede usar dos funciones para setear manualmente
    //el boolean a true o false con loadinOn() y loaadingOff()
    //this.loadingService.loadingOn();
    //para evitar múltiples llamadas al servicio, se usa el "sharereplay() --> courses.service.ts"
    //de otra forma se haría una llamada por cada subscripcion
    //MODO STATELESS
    // const courses$ = this.coursesService.loadAllCourses().pipe(
    //   map((courses) => courses.sort(sortCoursesBySeqNo)),
    //   catchError((err) => {
    //     const message = "Could not load the messages";
    //     this.messagesService.showErrors(message);
    //     console.log(message, err);
    //     return throwError(err);
    //   })
    //   //finalize(() => this.loadingService.loadingOff())
    // );
    // const loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);
    // //console.log(n);
    // this.beginnerCourses$ = loadCourses$.pipe(
    //   map((courses) =>
    //     courses.filter((courses) => courses.category === "BEGINNER")
    //   )
    // );
    // this.advancedCourses$ = loadCourses$.pipe(
    //   map((courses) =>
    //     courses.filter((courses) => courses.category === "ADVANCED")
    //   )
    // );
    //MODO STATEFUL
    this.beginnerCourses$ = this.courseStore.filterByCategory("BEGINNER");
    this.advancedCourses$ = this.courseStore.filterByCategory("ADVANCED");
  }
}
