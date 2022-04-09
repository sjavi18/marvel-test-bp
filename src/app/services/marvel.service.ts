import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICharacter } from '../models/character.model';

import { environment } from '../../environments/environment.prod';
import { CookieService } from 'ngx-cookie-service';

const url: string = environment.url_marvel;
@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  authorId = this._cookieService.get('author_id')

  constructor(private readonly _http: HttpClient,
    private readonly _cookieService: CookieService
    ) { }
    
    getAllCharacters(): Observable<ICharacter[]> {
      return this._http.get<ICharacter[]>(`${url}?idAuthor=${this.authorId}`);
    }

    searchCharacter(title: string): Observable<ICharacter[]> {
      return this._http.get<ICharacter[]>(
        `${url}?idAuthor=${this.authorId}&title=${title}`
      );
    }
  
    createCharacter(character: ICharacter): Observable<any> {
      return this._http.post<any>(`${url}?idAuthor=${this.authorId}`, character);
    }
  
    editCharacter(character: ICharacter, id: string | undefined): Observable<any> {
      return this._http.put<any>(
        `${url}/${id}?idAuthor=${this.authorId}`,
        character
      );
    }
  
    deleteCharacter(id: string): Observable<any> {
      return this._http.delete<any>(`${url}/${id}?idAuthor=${this.authorId}`);
    }
}
