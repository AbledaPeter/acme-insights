Acme Insights
=============

## Question

It's a belief that in a black or vertically striped dress you seems leaner, and a horizontally striped dress makes you look fat.  
My question was: **Does colour affect return rates?**  
Is it possible that the dress fits perfectly, but the colour or the texture of a dress makes the customers return the dress with the too large or too small reason?

## Solution

My solution consists of three steps.

#### JoinCollection
First I create a joined collection with mapreduce, which contains the needed data for the following steps. The new collection has an id, which is the *variant\_id* of the products, the *product\_id* and contains the product's color, and the necessary transaction data.

#### AggregateByColor
In the second step I run a mapreduce on the previously joined collection. The mapreduce aggregates the data by the color, and collect the products, and the transaction data.

#### QueryAggregatedData
In the third step run some query on the aggregated data. 

The query filters the data: 
* I need only those colors, which occur in more than 10 product.  
  It's important, because if I find a color with a high occurance of *too_small* return reason, I can't be sure, it was too small because the color of the dress.
* I need only those colors, which occur in more than 100 transaction.  
  A color with 50% too small return reason is not convicting if only 2 item were sold.

After the filter the program collect the top 5 too small/too large/dont like return rates.

## Result

Top 5 too_small return rates

Color   |Too Small Percent |Too Large Percent |Don't Like Percent
---|---|---|---
Bleach  |17.01%  |2.64%   |3.52%
Ink Blue        |14.29%  |3.25%   |3.73%
Mocha/Black     |14.24%  |0.33%   |1.99%
Raw     |13.16%  |2.61%   |2.87%
Cappuccino      |13.03%  |1.26%   |2.94%
Leopard Pony    |12.62%  |4.40%   |1.56%

Top 5 too_large return rates

Color   |Too Small Percent |Too Large Percent |Don't Like Percent
---|---|---|---
Bright Red     |2.23%   |13.79%  |1.83%
Khaki/White     |3.70%   |12.64%  |3.49%
Light Cream     |0.00%   |11.25%  |5.63%
Galaxy  |0.93%   |10.28%  |1.87%
Red/Brown       |3.41%   |10.23%  |3.98%
Multi Blue      |1.87%   |9.35%   |0.00%

Top 5 dont_like return rates

Color   |Too Small Percent |Too Large Percent |Don't Like Percent
---|---|---|---
Lime Multi      |4.73%   |7.43%   |14.86%
White Stripe    |6.67%   |0.00%   |12.38%
Black/Stone     |3.45%   |5.52%   |11.03%
Dew     |2.61%   |0.87%   |10.43%
Horizon |4.24%   |8.47%   |9.32%
Smoky   |0.34%   |2.07%   |8.97%

If i sell a bleach dress, it has 17% of chance of the return with the too small reason, and only 2,6% of return with the too large reason. 
