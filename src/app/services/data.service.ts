import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private cache = new Map<string, Observable<any>>();

  constructor(private http: HttpClient) {}

  private fromAssets<T>(path: string, key: string): Observable<T> {
    if (this.cache.has(key)) return this.cache.get(key)! as Observable<T>;

    const$ = this.http.get<T>(`/assets/data/${path}`).pipe(
      map(data => this.applyOverrides<T>(key, data)),
      shareReplay(1)
    );
    this.cache.set(key, const$);
    return const$;
  }

  private applyOverrides<T>(key: string, data: T): T {
    try {
      const raw = localStorage.getItem(`data:${key}`);
      if (!raw) return data;
      const override = JSON.parse(raw);
      if (Array.isArray(data) && Array.isArray(override)) {
        return override as T;
      }
      return { ...(data as any), ...(override as any) } as T;
    } catch {
      return data;
    }
  }

  getExperience() { return this.fromAssets<any[]>('experience.json', 'experience'); }
  getEducation() { return this.fromAssets<any[]>('education.json', 'education'); }
  getBlog() { return this.fromAssets<any[]>('blog.json', 'blog'); }
  getSkills() { return this.fromAssets<any[]>('skills.json', 'skills'); }
}
