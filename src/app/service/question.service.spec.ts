import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { QuestionService } from './question.service';
import { HttpClient } from '@angular/common/http';

describe('QuestionService', () => {
  let service: QuestionService;
  //let http:HttpClient;
  let httpControleer:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[QuestionService]
    });
    service = TestBed.inject(QuestionService);
    //http = TestBed.inject(HttpClient);
    httpControleer = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    
    expect(service).toBeTruthy();
  });
});
