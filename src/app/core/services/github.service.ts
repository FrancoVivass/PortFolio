import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * Interface para repositorios de GitHub
 */
export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
}

/**
 * Servicio para integrar con la API de GitHub
 * Obtiene repositorios públicos del usuario
 */
@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los repositorios públicos de un usuario
   * @param username - Nombre de usuario de GitHub
   * @param limit - Número máximo de repositorios a obtener
   */
  getUserRepos(username: string, limit: number = 6): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(
      `${this.apiUrl}/users/${username}/repos`,
      {
        params: {
          sort: 'updated',
          per_page: limit.toString()
        }
      }
    ).pipe(
      map(repos => repos.filter(repo => !repo.name.includes('fork'))),
      catchError(error => {
        console.error('Error fetching GitHub repos:', error);
        return of([]);
      })
    );
  }

  /**
   * Obtiene información del perfil de GitHub
   */
  getUserProfile(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}`).pipe(
      catchError(error => {
        console.error('Error fetching GitHub profile:', error);
        return of(null);
      })
    );
  }
}

