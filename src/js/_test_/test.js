import getLevel from '../request/index';
import fetchData from '../request/fetchData';

jest.mock('../request/fetchData');

beforeEach(() => {
  jest.resetAllMocks();
});

test.each([
  [
    'Ответ получен',
    { level: 99, status: 'ok' },
    1,
    'https://server/user/1',
    'Ваш текущий уровень: 99',
  ],
  [
    'Ошибка',
    { status: 'failed' },
    2,
    'https://server/user/2',
    'Информация об уровне временно недоступна',
  ],
])(
  'Проверка работы запроса %s',
  (_, obj, userId, expectedFetchData, expectedResponse) => {
    fetchData.mockReturnValue(obj);
    const response = getLevel(userId);
    expect(response).toEqual(expectedResponse);
    expect(fetchData).toBeCalledWith(expectedFetchData);
  },
);
