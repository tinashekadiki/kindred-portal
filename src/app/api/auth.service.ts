import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiUrl} from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  lKey = 'pl_r37PnlX_dSmhd';
  accessToken = 'sBs_ST%3ce%DD432x';

  constructor(private http: HttpClient, private router: Router) {
  }

  login = (email: any, password: any) =>
    this.http.post(
      `${apiUrl}/auth/login/admin`,
      {
        email,
        password
      }
    );

  getUsersToVerify = (page: number, limit: number, is_verified=-1) => this.http.get(`${apiUrl}/auth?page=${page}&limit=${limit}&is_verified=${is_verified}`);

  getCountries = () => this.http.get('https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json');

  verifyUser = (userObject: any) =>
    this.http.put(`${apiUrl}/auth/verify`, userObject);

  updateUser = (userObject: any, userId: string) =>
    this.http.put(`${apiUrl}/auth/update/${userId}`, userObject);

  deleteUser = (userId: string) =>
    this.http.delete(`${apiUrl}/auth/delete/${userId}`);

  approveAllUsers = () => this.http.put(`${apiUrl}/auth/verifyAll`, {});

  declineAllUsers = () => this.http.put(`${apiUrl}/auth/declineall`, {});

  // loginAdmin = (email: String,password: String) => this.http.post(`${apiUrl}/auth/login?email=${email}&password=${password}`,{})

  isTokenExpired(token?: any) {
    if (!token) {
      token = this.getToken();
    }

    if (!token) {
      return true;
    }

    let date: any = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    if (date) {
      return !(date.valueOf() > new Date().valueOf());
    }

    return 0;
  }

  getTokenExpirationDate(token: string) {
    let decoded: any;
    try {
      decoded = jwt_decode(token);
      if (decoded.exp === undefined) {
        return null;
      }
      const date = new Date(0);
      date.setUTCSeconds(decoded.exp);
      return date;
    } catch (err) {
      return this.router.navigate(['']);
    }
  }

  getToken() {
    return localStorage.getItem(this.accessToken);
  }

  isLoggedin(): boolean {
    const status_of_token = !this.isTokenExpired();
    return status_of_token;
  }

  // getListOfCOuntries():  {
  //   return this.http.get('https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json').subscribe(
  //     (res) => {
  //       console.log(res);
  //       return res;
  //     }
  //   )
  // }
}
