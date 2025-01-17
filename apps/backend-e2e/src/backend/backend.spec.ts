import axios from 'axios';

describe('GET /surveys', () => {
  it('should return HTTP 200 ok', async () => {
    const res = await axios.get(`/surveys`);

    expect(res.status).toBe(200);
  });
});
