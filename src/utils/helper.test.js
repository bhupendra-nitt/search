const { createFrequency, sanitizeString, getSortedResult, getDocumentList, searchTerm } = require('./helper');
test('create frequecy dictionary from array of summaries', () => {
  const summaryArray = [
    {
      'id': 0,
      'summary': 'hello world india'
    },
    {
      'id': 1,
      'summary': 'hello world.'
    },
  ]

  const expectedResult = { hello: { '0': 1, '1': 1 }, world: { '0': 1, '1': 1 }, india: {'0': 1} }
  expect(createFrequency(summaryArray)).toMatchObject(expectedResult);
});

describe('sanitize string', () => {
  
    test('sanitize string with fullstop', () => {
      const inputString = 'world.'
      const expectedResult = 'world'
      expect(sanitizeString(inputString)).toBe(expectedResult);

    });

    test('sanitize string with special character', () => {
      const inputString = 'world\u2019'
      const expectedResult = 'world'
      expect(sanitizeString(inputString)).toBe(expectedResult);

    });
})

describe('getSortedResult', () => {
  test('result for array', () => {
    const array = [{5: 2},
      {15: 3},
      {44: 4},
      {54: 1,}];
    const expectedResult = [ 44, 15, 5, 54 ];
    console.log(getSortedResult(array));
    expect(getSortedResult(array)).toEqual(expectedResult);
  })
})

describe('document list', () => {
  test('if not docuemtn ids return empty list', () => {
    const mockArray = [];
    const expectedResult = [];
    expect(getDocumentList(mockArray)).toEqual(expectedResult);
  })

  test('if not docuemtn ids return empty list', () => {
    const mockArray = [1,2];
    const expectedResult =[
      {
        summary: 'The Book in Three Sentences: The 10X Rule says that 1) you should set targets for yourself that are 10X greater than what you believe you can achieve and 2) you should take actions that are 10X greater than what you believe are necessary to achieve your goals. The biggest mistake most people make in life is not setting goals high enough. Taking massive action is the only way to fulfill your true potential.',
        author: 'Grant Cardone',
        id: 1,
        title: 'The Richest Man in Babylon'
      },
      {
        summary: 'The Book in Three Sentences: The only thing you have that nobody else has is control of your life. The hardest thing of all is to learn to love the journey, not the destination. Get a real life rather than frantically chasing the next level of success.',
        author: 'Anna Quindlen',
        id: 2,
        title: 'Letters from a Self-Made Merchant to His Son'
      }
    ];
    expect(getDocumentList(mockArray)).toMatchObject(expectedResult);
  })
})

describe('search term', () => {
  it('returns searched term ', () => {
    const searchFrequecny = 1;
    const searchString = 'create';
    const expectedResult = [
      {
        summary: 'The Book in Three Sentences: Too many people spend their life pursuing things that don’t actually make them happy. When you make a business, you get to make a little universe where you create all the laws. Never forget that absolutely everything you do is for your customers.',
        author: 'Derek Sivers',
        id: 5,
        title: 'Profit First'
      }
    ]
    expect(searchTerm(searchString, searchFrequecny)).toMatchObject(expectedResult)
  })

  it('returns searched term ', () => {
    const searchFrequecny = 2;
    const searchString = 'create';
    const expectedResult = [
      {
        summary: 'The Book in Three Sentences: Too many people spend their life pursuing things that don’t actually make them happy. When you make a business, you get to make a little universe where you create all the laws. Never forget that absolutely everything you do is for your customers.',
        author: 'Derek Sivers',
        id: 5,
        title: 'Profit First'
      },
      {
         "author": "Nassim Nicholas Taleb",
         "id": 15,
         "summary": "The Book in Three Sentences: Randomness, chance, and luck influence our lives and our work more than we realize. Because of hindsight bias and survivorship bias, in particular, we tend to forget the many who fail, remember the few who succeed, and then create reasons and patterns for their success even though it was largely random. Mild success can be explainable by skills and hard work, but wild success is usually attributable to variance and luck.",
         "title": "Ignore Everybody",
       },
    ]
    expect(searchTerm(searchString, searchFrequecny)).toMatchObject(expectedResult)
  })
})