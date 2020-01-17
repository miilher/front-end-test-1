import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Lists } from '../../../interfaces/ilists';


@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(private http: HttpClient) { }

  getAllLists(idCategorie) {
    return this.http.get<Lists[]>(environment.urlApi + 'categories/' + idCategorie + '/lists');
  }

  getOnlyList(idCategorie, idList) {
    return this.http.get<Lists>(environment.urlApi + 'categories/' + idCategorie + '/lists/' + idList);
  }

  postList(idCategorie, data) {
    return this.http.post<any>(environment.urlApi + 'categories/' + idCategorie + '/lists', data);
  }

  editList(idCategorie, idList, data) {
    return this.http.put<any>(environment.urlApi + 'categories/' + idCategorie + '/lists/' + idList, data);
  }

  deleteList(idCategorie, idList) {
    return this.http.delete<any>(environment.urlApi + 'categories/' + idCategorie + '/lists/' + idList);
  }
}
