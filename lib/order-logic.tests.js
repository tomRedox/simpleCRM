import { mocha } from 'meteor/avital:mocha';
import { chai, assert } from "meteor/practicalmeteor:chai";
import { lineValue } from './order-logic'

//// This is what breaks it for me
////const { describe, it } = mocha;


 describe('lineValue', () => {
     it('calculates unit price correctly when values set', () => {
         const orderLine = {
             quantity: 5,
             unitPrice: 3
         };

         const result = lineValue(orderLine);

         assert.isTrue(result === orderLine.quantity * orderLine.unitPrice, 'value was wrong');
     });
 });


 describe('lineValue', () => {
     it('calculates value correctly when quantity is zero', () => {
         const orderLine = {
             quantity: 0,
             unitPrice: 3
         };

         const result = lineValue(orderLine);

         assert.isTrue(result === 0, 'value should be zero');
     });
 });