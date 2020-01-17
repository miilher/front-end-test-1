import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../../../interfaces/icategories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get<Categories[]>(environment.urlApi + 'categories/');
  }

  getOnlyCategorie(idCategorie) {
    return this.http.get<Categories>(environment.urlApi + 'categories/' + idCategorie);
  }

  postCategorie(data) {
    return this.http.post<any>(environment.urlApi + 'categories/', data);
  }

  editCategorie(idCategorie, data) {
    return this.http.put<any>(environment.urlApi + 'categories/' + idCategorie, data);
  }

  deleteCategorie(idCategorie) {
    return this.http.delete<any>(environment.urlApi + 'categories/' + idCategorie);
  }
}
