import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DiulStudent } from '../shared/models/DiulStudent';
import {
  DIUL_STUDENTS_BY_CI_URL,
  DIUL_STUDENTS_BY_SEARCH_URL,
  DIUL_STUDENTS_INCLUDE_URL,
  DIUL_STUDENTS_MODIFY_URL,
  DIUL_STUDENTS_REMOVE_BY_CHECK_URL,
  DIUL_STUDENTS_REMOVE_URL,
  DIUL_STUDENTS_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class StudentDiulService {
  private studentSubject = new BehaviorSubject<DiulStudent>(new DiulStudent());
  public studentObservable: Observable<DiulStudent>;

  constructor(private http: HttpClient) {
    this.studentObservable = this.studentSubject.asObservable();
  }
  getAll(): Observable<DiulStudent[]> {
    return this.http.get<DiulStudent[]>(DIUL_STUDENTS_URL);
  }

  getAllStudentsBySearchTerm(searchTerm: unknown): Observable<DiulStudent[]> {
    return this.http.post<DiulStudent[]>(
      DIUL_STUDENTS_BY_SEARCH_URL,
      searchTerm,
    );
  }
  getAllStudentsByCi(ci_passport: string): Observable<DiulStudent> {
    return this.http.get<DiulStudent>(DIUL_STUDENTS_BY_CI_URL + ci_passport);
  }

  include(student: DiulStudent): Observable<DiulStudent[]> {
    return this.http.post<DiulStudent[]>(DIUL_STUDENTS_INCLUDE_URL, student);
  }

  removeByCi(id: string): Observable<DiulStudent[]> {
    return this.http.delete<DiulStudent[]>(DIUL_STUDENTS_REMOVE_URL + id);
  }

  removeAllCheck(ci_passport: string[]): Observable<DiulStudent[]> {
    return this.http.delete<DiulStudent[]>(DIUL_STUDENTS_REMOVE_BY_CHECK_URL, {
      body: { studentsDiulCheck: ci_passport },
    });
  }

  modify(student: DiulStudent): Observable<DiulStudent> {
    return this.http.put<DiulStudent>(DIUL_STUDENTS_MODIFY_URL, student);
  }
}
