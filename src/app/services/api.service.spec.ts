import {TestBed} from '@angular/core/testing';
import {ApiService} from './api.service';
import {of} from "rxjs";
import {HttpClient, HttpHandler} from "@angular/common/http";

const listCards = {
  amiibo: [
    {
      amiiboSeries: 'Pippo',
      character: '',
      gameSeries: '',
      head: '',
      image: 'pippo.jpg',
      name: '',
      release: null,
      tail: '',
      type: '',
      show: false,
      match: false,
      id: '1'
    },
    {
      amiiboSeries: 'Pluto',
      character: '',
      gameSeries: '',
      head: '',
      image: 'pluto.jpg',
      name: '',
      release: null,
      tail: '',
      type: '',
      show: false,
      match: false,
      id: '2'
    }
  ]
}

describe('ApiService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ApiService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('metodo loadGameSeries che carica game series', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(listCards))

    service.loadGameSeries(0).subscribe(
      list => {
        expect(list).toEqual(listCards.amiibo);
        done();
      },
      done.fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  })
});
