import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StudentProfileDto} from "../../@core/dtos/student-profile-dto";
import {FirstComponentService} from "../../@core/services/first-component.service";

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.scss']
})
export class FirstComponentComponent implements OnInit {
   form!: FormGroup;
   student: StudentProfileDto = new StudentProfileDto();

  constructor(
    private fb: FormBuilder,
    private service: FirstComponentService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      surname: ["", [Validators.required]],
      mark: [0, [Validators.min(2), Validators.max(10)]]
    })
  }

  async save(): Promise<void>{
    this.student.name = this.form.get("name")?.value;
    this.student.surname = this.form.get("surname")?.value;
    this.student.mark = this.form.get("mark")?.value;

    try {
      await this.service.save(this.student);
    } catch (err) {
      console.error(err);
    }
  }

  async getStudent(): Promise<void> {

    try {
      this.student = await this.service.get(0);
    } catch (err) {
      console.error(err);
    }
  }

  cancel(): void {
    this.form.get("name")?.setValue(this.student.name);
    this.form.get("surname")?.setValue(this.student.surname);
    this.form.get("mark")?.setValue(this.student.mark);
  }
}
