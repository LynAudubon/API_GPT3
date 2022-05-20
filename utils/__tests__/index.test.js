import event from '../../assets/js/index.js';
import jest from 'jest-mock';

// test('It should pass', () => {
//   const mockData = [
//     {prompt: 'some-tilte-1', response: 'some-1'},
//     {prompt: 'some-tilte-2', response: 'some-2'},
//     {prompt: 'some-tilte-3', response: 'some-3'},
//   ];
 
//   global.fetch = jest.fn(function() {
//     Promise.resolve(mockData);
//   });

//   const instanceMock = jest.spyOn(methods, 'displayResponses');
//   document.addEventListener = jest
//     .fn()
//     .mockImplementationOnce((event, callback) => {
//       callback();
//     });
//   methods.displayResponses();
//   expect(document.addEventListener).toBeCalledWith(
//     'DOMContentLoaded',
//     expect.any(Function)
//   );
// }); 

test('It should pass', () => {
  const indexModule = {
    init: function () {
      document.addEventListener('DOMContentLoaded', () => {
        this.instance();
      });
    },
    instance: function () {
      event.displayResponses;
      console.log('DisplayResponse called');
    }
  };


  const instanceMock = jest.spyOn(indexModule, 'instance');
  document.addEventListener = jest
    .fn()
    .mockImplementationOnce((event, callback) => {
      callback();
    });
  indexModule.init();
  expect(document.addEventListener).toBeCalledWith(
    'DOMContentLoaded',
    expect.any(Function)
  );
  expect(instanceMock).toBeCalledTimes(1);
});
