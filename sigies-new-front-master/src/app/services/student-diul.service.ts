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
import { CombinedData } from '../shared/models/CombinedData';

@Injectable({
  providedIn: 'root',
})
export class StudentDiulService {
  private studentSubject = new BehaviorSubject<DiulStudent>(new DiulStudent());
  public studentObservable: Observable<DiulStudent>;

  constructor(private http: HttpClient) {
    this.studentObservable = this.studentSubject.asObservable();
  }
  getAll(): Observable<CombinedData[]> {
    return this.http.get<CombinedData[]>(DIUL_STUDENTS_URL);
  }

  getAllStudentsBySearchTerm(searchTerm: unknown): Observable<CombinedData[]> {
    return this.http.post<CombinedData[]>(
      DIUL_STUDENTS_BY_SEARCH_URL,
      searchTerm,
    );
  }
  getAllStudentsById(id: string): Observable<CombinedData> {
    return this.http.get<CombinedData>(DIUL_STUDENTS_BY_CI_URL + id);
  }

  include(student: DiulStudent): Observable<CombinedData[]> {
    return this.http.post<CombinedData[]>(DIUL_STUDENTS_INCLUDE_URL, student);
  }

  removeByCi(id: string): Observable<CombinedData[]> {
    return this.http.delete<CombinedData[]>(DIUL_STUDENTS_REMOVE_URL + id);
  }

  removeAllCheck(id: string[]): Observable<CombinedData[]> {
    return this.http.delete<CombinedData[]>(DIUL_STUDENTS_REMOVE_BY_CHECK_URL, {
      body: { studentsCipCheck: id },
    });
  }

  modify(student: DiulStudent): Observable<CombinedData[]> {
    return this.http.put<CombinedData[]>(DIUL_STUDENTS_MODIFY_URL, student);
  }
}
