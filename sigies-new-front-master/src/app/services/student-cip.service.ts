import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CipStudent } from '../shared/models/CipStudent';
import {
  CIP_STUDENTS_BY_CI_URL,
  CIP_STUDENTS_BY_SEARCH_URL,
  CIP_STUDENTS_INCLUDE_URL,
  CIP_STUDENTS_MODIFY_URL,
  CIP_STUDENTS_REMOVE_BY_CHECK_URL,
  CIP_STUDENTS_REMOVE_URL,
  CIP_STUDENTS_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class StudentCipService {
  private studentSubject = new BehaviorSubject<CipStudent>(new CipStudent());
  public studentObservable: Observable<CipStudent>;

  constructor(private http: HttpClient) {
    this.studentObservable = this.studentSubject.asObservable();
  }
  getAll(): Observable<CipStudent[]> {
    return this.http.get<CipStudent[]>(CIP_STUDENTS_URL);
  }

  getAllStudentsBySearchTerm(searchTerm: unknown): Observable<CipStudent[]> {
    return this.http.post<CipStudent[]>(CIP_STUDENTS_BY_SEARCH_URL, searchTerm);
  }
  getAllStudentsByCi(ci_passport: string): Observable<CipStudent> {
    return this.http.get<CipStudent>(CIP_STUDENTS_BY_CI_URL + ci_passport);
  }

  include(student: CipStudent): Observable<CipStudent[]> {
    return this.http.post<CipStudent[]>(CIP_STUDENTS_INCLUDE_URL, student);
  }

  removeByCi(id: string): Observable<CipStudent[]> {
    return this.http.delete<CipStudent[]>(CIP_STUDENTS_REMOVE_URL + id);
  }

  removeAllCheck(ci_passport: string[]): Observable<CipStudent[]> {
    return this.http.delete<CipStudent[]>(CIP_STUDENTS_REMOVE_BY_CHECK_URL, {
      body: { studentsCipCheck: ci_passport },
    });
  }

  modify(student: CipStudent): Observable<CipStudent> {
    return this.http.put<CipStudent>(CIP_STUDENTS_MODIFY_URL, student);
  }
}
