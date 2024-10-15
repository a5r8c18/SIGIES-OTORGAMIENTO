import { Injectable } from '@angular/core';
import { Student } from '../shared/models/Student';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  STUDENTS_BY_CI_URL,
  STUDENTS_BY_SEARCH_URL,
  STUDENTS_INCLUDE_URL,
  STUDENTS_MODIFY_URL,
  STUDENTS_REMOVE_BY_CHECK_URL,
  STUDENTS_REMOVE_BY_CI_URL,
  STUDENTS_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private studentSubject = new BehaviorSubject<Student>(new Student());
  public studentObservable: Observable<Student>;

  constructor(private http: HttpClient) {
    this.studentObservable = this.studentSubject.asObservable();
  }
  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(STUDENTS_URL);
  }

  getAllStudentsBySearchTerm(searchTerm: unknown): Observable<Student[]> {
    return this.http.post<Student[]>(STUDENTS_BY_SEARCH_URL, searchTerm);
  }
  getAllStudentsByCi(ci_passport: string): Observable<Student> {
    return this.http.get<Student>(STUDENTS_BY_CI_URL + ci_passport);
  }

  include(student: Student): Observable<Student[]> {
    return this.http.post<Student[]>(STUDENTS_INCLUDE_URL, student);
  }

  removeByCi(ci_passport: string): Observable<Student[]> {
    return this.http.delete<Student[]>(STUDENTS_REMOVE_BY_CI_URL + ci_passport);
  }

  removeAllCheck(ci_passport: string[]): Observable<Student[]> {
    return this.http.delete<Student[]>(STUDENTS_REMOVE_BY_CHECK_URL, {
      body: { studentsCheck: ci_passport },
    });
  }

  modify(student: Student): Observable<Student> {
    return this.http.put<Student>(STUDENTS_MODIFY_URL, student);
  }
}
