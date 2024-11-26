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
import { CombinedData } from '../shared/models/CombinedData';

@Injectable({
  providedIn: 'root',
})
export class StudentCipService {
  private studentSubject = new BehaviorSubject<CipStudent>(new CipStudent());
  public studentObservable: Observable<CipStudent>;

  constructor(private http: HttpClient) {
    this.studentObservable = this.studentSubject.asObservable();
  }
  getAll(): Observable<CombinedData[]> {
    return this.http.get<CombinedData[]>(CIP_STUDENTS_URL);
  }

  getAllStudentsBySearchTerm(searchTerm: unknown): Observable<CombinedData[]> {
    return this.http.post<CombinedData[]>(
      CIP_STUDENTS_BY_SEARCH_URL,
      searchTerm,
    );
  }
  getAllStudentsById(id: string): Observable<CombinedData> {
    return this.http.get<CombinedData>(CIP_STUDENTS_BY_CI_URL + id);
  }

  include(student: CipStudent): Observable<CombinedData[]> {
    return this.http.post<CombinedData[]>(CIP_STUDENTS_INCLUDE_URL, student);
  }

  removeByCi(id: string): Observable<CombinedData[]> {
    return this.http.delete<CombinedData[]>(CIP_STUDENTS_REMOVE_URL + id);
  }

  removeAllCheck(id: string[]): Observable<CombinedData[]> {
    return this.http.delete<CombinedData[]>(CIP_STUDENTS_REMOVE_BY_CHECK_URL, {
      body: { studentsCipCheck: id },
    });
  }

  modify(student: CipStudent): Observable<CombinedData[]> {
    return this.http.put<CombinedData[]>(CIP_STUDENTS_MODIFY_URL, student);
  }
}
