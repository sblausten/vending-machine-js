## Vending Machine Exercise

### Requirements:

Design a vending machine using a programming language of your choice. 

The vending machine should perform as follows:

- The machine should take an initial load of products and change. The 
change will be of denominations 1p, 2p, 5p, 10p, 20p, 50p, £1, £2.
- The machine should keep track of the products and change that it 
contains.
- There should be a way of reloading either products or change at a 
later point.
- Once an item is selected and the appropriate amount of money is 
inserted, the vending machine should return the correct product.
- It should also return change if too much money is provided, or ask for 
more money if insufficient funds have been inserted.

##### As an admin:
1. I will load a new vending machine with products and change

##### As a customer:
2. I can receive a product
if I select it and add coins that equal its cost

3. I will be asked for more coins
if I the coins I add are less than the value of the product selected

3. I will receive change
if I add coins more than the value of the product selected



### To Run programme:

Inside this directory:
```
npm i
npm run build
npm start

```

### To Run tests:

Inside this directory:
```
npm i
npm i -g mocha
mocha
```

