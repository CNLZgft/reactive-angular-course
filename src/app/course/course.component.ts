import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import {
  merge,
  fromEvent,
  Observable,
  concat,
  throwError,
  combineLatest,
} from "rxjs";
import { Lesson } from "../model/lesson";
import { CoursesService } from "../services/courses.service";
import { map, tap } from "rxjs/operators";

interface CourseData {
  course: Course;
  lessons: Lesson[];
}

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit {
  //usando un observable
  data$: Observable<CourseData>;

  //usando múltiples observables para  visualizar los datos de
  //los cursos y las lecciones
  // course$: Observable<Course>;

  // lessons$: Observable<Lesson[]>;

  // lessons: Lesson[];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    const courseId = parseInt(this.route.snapshot.paramMap.get("courseId"));

    //múltiples observables
    // this.course$ = this.coursesService.loadCourseById(courseId);

    // this.lessons$ = this.coursesService.loadAllCourseLessons(courseId);

    //usando un observable, con el combineLatest
    const course$ = this.coursesService.loadCourseById(courseId);

    const lessons$ = this.coursesService.loadAllCourseLessons(courseId);

    //la posicion 0 emitira valores de course$ y la posicion 1 emitira valores de lessons$
    this.data$ = combineLatest([course$, lessons$]).pipe(
      map(([course, lessons]) => {
        return {
          course,
          lessons,
        };
      }),
      tap(console.log)
    );
  }
}
