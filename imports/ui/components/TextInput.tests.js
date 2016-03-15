import { mocha } from 'meteor/avital:mocha';
import { chai, assert } from "meteor/practicalmeteor:chai";
import { lineValue, recalculateOrderTotals } from './order-logic'

var ReactTestUtils = require('react-addons-test-utils');



describe('TextInput.jsx', () => {

    describe('lineValue', () => {

        it('calculates value correctly when quantity is zero', () => {
            const orderLine = {quantity: 0, unitPrice: 3};
            expect(lineValue(orderLine)).to.equal(0);
        });

        it('calculates unit price correctly when values set', () => {
            const orderLine = {quantity: 4, unitPrice: 5};
            expect(lineValue(orderLine)).to.equal(20);
        });

    });

})