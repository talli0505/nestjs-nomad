import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach로 하면 할때마다 데이터베이스 생성해야하므로 beforeAll로 바꿔서 사용
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // e2e 테스트 할때 같은 pipe의 형태가 없으면 제대로 작동 안 할수있음
    // 여기서는 transform으로 인해 자동적으로 타입을 맞춰주는데 이게 없으면 e2e 테스트에서는 변경이 안되서 문제생김
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });
    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });
    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404);
    });

    describe('/movies/:id', () => {
      it('GET 200', () => {
        return request(app.getHttpServer())
          .get('/movies/1')
          .expect(200);
      });
      it('GET 404', () => {
        return request(app.getHttpServer())
          .get('/movies/999')
          .expect(404);
      });
      it('PATCH 200', () => {
        return request(app.getHttpServer())
          .patch('/movies/1')
          .send({ title: 'Updated Test' })
          .expect(200);
      });
      it('DELETE 200', () => {
        return request(app.getHttpServer())
          .delete('/movies/1')
          .expect(200);
      });
    });
  });  
});
