import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CourseStore {
  courses$: Observable<Course[]>;

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses) =>
        courses
          .filter((course) => course.category === category)
          .sort(sortCoursesBySeqNo)
      )
    );
  }
}
