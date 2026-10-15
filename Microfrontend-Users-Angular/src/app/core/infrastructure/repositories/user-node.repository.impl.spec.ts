import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { USERS_MOCK } from '../../../mocks/users.mocks';
import { DataService } from '../services/data.service';
import { UserNodeRepositoryImpl } from './user-node.repository.impl';

describe('UserNodeRepositoryImpl (Infrastructure)', () => {
  let repository: UserNodeRepositoryImpl;
  const dataServiceMock = {
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    getUsersByEngineering: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserNodeRepositoryImpl, { provide: DataService, useValue: dataServiceMock }],
    });
    repository = TestBed.inject(UserNodeRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('getAll delega en DataService.getAllUsers()', (done) => {
    dataServiceMock.getAllUsers.mockReturnValue(of(USERS_MOCK));
    repository.getAll(5).subscribe((result) => {
      expect(dataServiceMock.getAllUsers).toHaveBeenCalledWith(5);
      expect(result).toEqual(USERS_MOCK);
      done();
    });
  });

  it('getById delega en DataService.getUserById()', (done) => {
    dataServiceMock.getUserById.mockReturnValue(of(USERS_MOCK[0]));
    repository.getById(1).subscribe((result) => {
      expect(dataServiceMock.getUserById).toHaveBeenCalledWith(1);
      expect(result).toEqual(USERS_MOCK[0]);
      done();
    });
  });

  it('getByEngineering delega en DataService.getUsersByEngineering()', (done) => {
    dataServiceMock.getUsersByEngineering.mockReturnValue(of(USERS_MOCK));
    repository.getByEngineering('Sistemas').subscribe((result) => {
      expect(dataServiceMock.getUsersByEngineering).toHaveBeenCalledWith('Sistemas');
      expect(result).toEqual(USERS_MOCK);
      done();
    });
  });
});
