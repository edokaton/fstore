import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interface/product.interface';
import { BASE_URL } from '../global-data';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(BASE_URL + '/products')
      .pipe(
        catchError((errorRes) => {
          return throwError(() => new Error(errorRes));
        })
      );
  }

  /* fetchTopRatedMovieList(
    params: MovieRequestParams
  ): Observable<MoviesResponse> {
    return this.http
      .get<MoviesResponse>(BASE_URL + 'movie/top_rated', {
        params: params,
      })
      .pipe(
        catchError((errorRes) => {
          return throwError(() => new Error(errorRes));
        })
      );
  }

  fetchNowPlayingMovieList(
    params: MovieRequestParams
  ): Observable<MovieWithDatesResponse> {
    return this.http
      .get<MovieWithDatesResponse>(BASE_URL + 'movie/now_playing', {
        params: params,
      })
      .pipe(
        catchError((errorRes) => {
          return throwError(() => new Error(errorRes));
        })
      );
  }

  fetchUpcomingMovieList(
    params: MovieRequestParams
  ): Observable<MovieWithDatesResponse> {
    return this.http
      .get<MovieWithDatesResponse>(BASE_URL + 'movie/upcoming', {
        params: params,
      })
      .pipe(
        catchError((errorRes) => {
          return throwError(() => new Error(errorRes));
        })
      );
  }

  fetchMovieDetails(movieId: number): Observable<MovieDetails> {
    return this.http
      .get<MovieDetails>(BASE_URL + 'movie/' + movieId.toString())
      .pipe(
        catchError((errorRes) => {
          return throwError(() => new Error(errorRes));
        })
      );
  } */
}