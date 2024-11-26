import { Injectable } from '@angular/core';
import { Official } from '../shared/models/Official';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  OFFICIALS_BY_ID_URL,
  OFFICIALS_BY_SEARCH_URL,
  OFFICIALS_INCLUDE_URL,
  OFFICIALS_MODIFY_URL,
  OFFICIALS_REMOVE_BY_CHECK_URL,
  OFFICIALS_REMOVE_BY_ID_URL,
  OFFICIALS_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class OfficialService {
  private officialSubject = new BehaviorSubject<Official>(new Official());
  public officialObservable: Observable<Official>;

  constructor(private http: HttpClient) {
    this.officialObservable = this.officialSubject.asObservable();
  }

  getAll(): Observable<Official[]> {
    return this.http.get<Official[]>(OFFICIALS_URL);
  }

  getAllOfficialsBySearchTerm(searchTerm: Official): Observable<Official[]> {
    return this.http.post<Official[]>(OFFICIALS_BY_SEARCH_URL, searchTerm);
  }
  getAllOfficialsById(officialId: string): Observable<Official> {
    return this.http.get<Official>(OFFICIALS_BY_ID_URL + officialId);
  }

  include(official: Official): Observable<Official[]> {
    return this.http.post<Official[]>(OFFICIALS_INCLUDE_URL, official);
  }

  removeById(officialId: string): Observable<Official[]> {
    return this.http.delete<Official[]>(
      OFFICIALS_REMOVE_BY_ID_URL + officialId,
    );
  }

  removeAllCheck(officialIds: string[]): Observable<Official[]> {
    return this.http.delete<Official[]>(OFFICIALS_REMOVE_BY_CHECK_URL, {
      body: { officialsCheck: officialIds },
    });
  }

  modify(official: Official): Observable<Official> {
    return this.http.put<Official>(OFFICIALS_MODIFY_URL, official);
  }
}
