import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, firstValueFrom, lastValueFrom, map } from 'rxjs';

@Injectable()
export class FontAwesomeSearchService {

  http = inject(HttpClient);
  FA_API = 'https://api.fontawesome.com';
  FA_AUTHORIZATION = 'Bearer 3076D3D3-2984-4399-A93E-0869E99F37B1';

  getToken(): Observable<any> {
    const url = `${this.FA_API}/token`;
    const headers = new HttpHeaders().set('Authorization', `${this.FA_AUTHORIZATION}`);
    return this.http.post(url, null, { headers: headers }).pipe(
      map((response) => {
        return response;
      }),
    );
  }

  async getIcons(search, qtd) {
    const token = await firstValueFrom(this.getToken());

    const headers = new HttpHeaders().set('Authorization', `${token.token_type} ${token.access_token}`);
    return await lastValueFrom(this.http.post(this.FA_API, this.getQuery(search, qtd), { headers: headers }));
  }

  getQuery(search, qtd) {
    return { "query": "query { search (version: \"6.0.0\", query: \""+search+"\", first: "+qtd+") {id unicode label familyStylesByLicense { free { family style } pro {family style} } } }" }
  }
}
