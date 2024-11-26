import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Announcement } from '../shared/models/Announcement';
import { HttpClient } from '@angular/common/http';
import {
  ANNOUNCEMENT_BY_ID_URL,
  ANNOUNCEMENT_BY_SEARCH_URL,
  ANNOUNCEMENT_INCLUDE_URL,
  ANNOUNCEMENT_MODIFY_URL,
  ANNOUNCEMENT_REMOVE_BY_CHECK_URL,
  ANNOUNCEMENT_REMOVE_BY_ID_URL,
  ANNOUNCEMENT_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private announcementSubject = new BehaviorSubject<Announcement>(
    new Announcement(),
  );
  public announcementObservable: Observable<Announcement>;

  constructor(private http: HttpClient) {
    this.announcementObservable = this.announcementSubject.asObservable();
  }

  getAll(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(ANNOUNCEMENT_URL);
  }

  getAllAnnouncementBySearchTerm(
    searchTerm: unknown,
  ): Observable<Announcement[]> {
    return this.http.post<Announcement[]>(
      ANNOUNCEMENT_BY_SEARCH_URL,
      searchTerm,
    );
  }
  getAllAnnouncementsById(announcementId: string): Observable<Announcement> {
    return this.http.get<Announcement>(ANNOUNCEMENT_BY_ID_URL + announcementId);
  }

  include(announcement: Announcement): Observable<Announcement[]> {
    return this.http.post<Announcement[]>(
      ANNOUNCEMENT_INCLUDE_URL,
      announcement,
    );
  }

  removeById(announcementId: string): Observable<Announcement[]> {
    return this.http.delete<Announcement[]>(
      ANNOUNCEMENT_REMOVE_BY_ID_URL + announcementId,
    );
  }

  removeAllCheck(announcementIds: string[]): Observable<Announcement[]> {
    return this.http.delete<Announcement[]>(ANNOUNCEMENT_REMOVE_BY_CHECK_URL, {
      body: { announcementsCheck: announcementIds },
    });
  }

  modify(announcement: Announcement): Observable<Announcement> {
    return this.http.put<Announcement>(ANNOUNCEMENT_MODIFY_URL, announcement);
  }
}
