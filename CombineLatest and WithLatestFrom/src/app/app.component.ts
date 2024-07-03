import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, catchError, combineLatest, of, startWith, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  form: FormGroup;
  combinedSelection: string;
  combinedSelections: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      color: ['']
    });
  }

  ngOnInit() {
    const name$ = this.form.get('name')!.valueChanges;
    const color$ = this.form.get('color')!.valueChanges;

    combineLatest([name$, color$])
      .pipe(takeUntil(this.destroy$)
      )
      .subscribe(([name, color]) => {
        this.combinedSelection = `Name: ${name}, Color: ${color}`;
        this.combinedSelections.push(this.combinedSelection);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
 