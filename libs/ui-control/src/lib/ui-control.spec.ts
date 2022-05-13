import { IDataStore } from './interfaces/IDataStore';
import { UiControl } from './ui-control';
jest.mock('./interfaces/IDataStore.ts');

describe('uiControl', () => {
  let uiControl: UiControl;

  const dataStore = {
    resetAll: jest.fn(),
    getNumbers: jest.fn(),
  } as jest.Mocked<IDataStore>;

  beforeEach(() => {
    jest.resetAllMocks();
    uiControl = new UiControl(dataStore);
  });

  it('should reset data', () => {
    // when
    uiControl.reset();

    // then
    expect(dataStore.resetAll).toBeCalledTimes(1);
  });

  it('should add numbers', () => {
    // given
    dataStore.getNumbers.mockReturnValue([2, 3, 4]);

    // when
    const result = uiControl.addNumbers();

    // then
    expect(result).toEqual(9);
    expect(dataStore.getNumbers).toBeCalledTimes(1);
  });
});
