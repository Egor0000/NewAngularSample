import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StudentProfileDto} from "../dtos/student-profile-dto";
import {firstValueFrom} from "rxjs";
import {group} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class FirstComponentService {

  url = 'http://localhost:8443/api/service/student';
  constructor(
    public httpClient: HttpClient
  ) { }

  save(student: StudentProfileDto): Promise<StudentProfileDto> {
    return firstValueFrom(this.httpClient.post<StudentProfileDto>(`${this.url}/`, student));
  }

  get(id: number): Promise<StudentProfileDto> {
    return firstValueFrom(this.httpClient.get<StudentProfileDto>(`${this.url}/${id}`));
  }

  update(student: StudentProfileDto): Promise<StudentProfileDto> {
    return firstValueFrom(this.httpClient.put<StudentProfileDto>(`${this.url}/`, student));
  }

  delete(id: number): Promise<StudentProfileDto> {
    return firstValueFrom(this.httpClient.delete<StudentProfileDto>(`${this.url}/${id}`));
  }
}
