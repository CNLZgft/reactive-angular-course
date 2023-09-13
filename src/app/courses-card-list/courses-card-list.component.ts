import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";
import { filter, tap } from "rxjs/operators";

@Component({
  selector: "courses-card-list",
  templateUrl: "./courses-card-list.component.html",
  styleUrls: ["./courses-card-list.component.scss"],
})
export class CoursesCardListComponent {
  @Input()
  courses: Course[] = [];

  @Output()
  private coursesChanged = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  editCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    //dialogRef emitirá valores cada vez que el pop-up se cierre
    //se subscribe para saber cada vez que se cierra el pop-up
    dialogRef
      .afterClosed()
      //filtrar sólo los valores verdaderos,  cuando se modifique el formulario satisfactoriamente
      .pipe(
        filter((value) => !!value),
        //para informar al resto de la aplicacion que se ha modificado
        //se usa el tap() para crear un sideDefect
        tap((event) => this.coursesChanged.emit(event))
      )
      .subscribe();
  }
}
