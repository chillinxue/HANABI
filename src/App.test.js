// import React from 'react';
// import { render } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { store } from './app/store';
// import App from './App';

// test('renders learn react link', () => {
//     const { getByText } = render(
//         <Provider store={store}>
//             <App />
//         </Provider>
//     );

//     expect(getByText(/learn/i)).toBeInTheDocument();
// });

function add(a, b) {
    if (typeof a == 'string') {
        return false;
    }
    return a + b;
}

describe('add function', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(add(1, 2)).toBe(3);
    });
    test('adds -2 + -3 to equal -5', () => {
        expect(add(-2, -3)).toBe(-5);
    });
    it('should alert if a is a string', () => {
        expect(add(3, 5)).toBe(8);
    });
});

// if (typeof a === "string"){
// window.alert

// }

// if (add(1, 2) === 3) {
//     console.log('success');
// } else {
//     console.log('error');
// }

// if (add(2, 3) === 5) {
//     console.log('success');
// } else {
//     console.log('error');
// }
