const request = require('supertest')
const app = require('./server')
describe('fail', () => {
  it('fail1', async () => {
    const res = await request(app)
      .post('/')
      .send({
        'url': 'http://www.amazon.com/Apple-iPhone-16gb-Space-Unlocked/dp/B00NQGP42Y/'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.error).toBe('Could not fetch data')
  })
})

describe('pass', () => {
    it('pass1', async () => {
      const res = await request(app)
        .post('/')
        .send({
          'url': 'https://www.amazon.in/New-Apple-iPhone-Pro-256GB/dp/B08L5T44CQ/ref=sr_1_2/'
        })
      expect(res.statusCode).toEqual(200)
      expect(res.body.title).toBe('New Apple iPhone 12 Pro (256GB) - Graphite')
      expect(res.body.description).toBe('Pro camera system with 12MP Ultra Wide, Wide and Telephoto cameras; 4x optical zoom range; Night mode, Deep Fusion, Smart HDR 3, Apple ProRAW, 4K Dolby Vision HDR recording')
      expect(res.body.image).toBe('https://images-na.ssl-images-amazon.com/images/I/71YlH-4MUQL._SX466_.jpg')
    })
  })